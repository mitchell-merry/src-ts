import { DeleteRunResponse, PostRun, PostRunResponse, PutRunPlayers, PutRunPlayersResponse, PutRunStatus, PutRunStatusResponse, Run, RunError, RunParams, RunResponse, RunsParams, RunsResponse } from "../../types";
import { get, GetOptions, http, HTTPOptions, paginatedGet, PaginatedGetOptions, shimData } from "../http";
import SRCError from "../SRCError";

/** This will return a list of all runs.
 * 
 * GET /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runs
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
 export async function getAllRuns<Embed extends string = "">(queryParams?: RunsParams<Embed>, options?: PaginatedGetOptions): Promise<Run<Embed>[]> {
	return paginatedGet<RunsResponse<Embed>>(`/runs`, queryParams, options);
}

/** This will return a single run based on id.
 * 
 * GET /runs/id https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runsid
 * 
 * @param id ID of the run to get.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
 export async function getRun<Embed extends string = "">(id: string, queryParams?: RunParams<Embed>, options?: GetOptions): Promise<Run<Embed>> {
	return get<RunResponse<Embed>>(`/runs/${id}`, queryParams, options).then(shimData);
}

/** Submit a run to speedrun.com. Only super moderators can auto-verify.
 * 
 * POST /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#post-runs
 * 
 * @param run The run to submit.
 * @param key The API key of the account to submit with. Get it from <https://www.speedrun.com/settings/apikey>. Protect it.
 * @param options Options for the HTTP request itself.
*/
export function submitRun(run: PostRun, key: string, options: HTTPOptions = {}): Promise<PostRunResponse> {
	return http<PostRunResponse, RunError>('/runs', 'post', key, { body: { run }, ...options });
}

/** Change the status of a run.
 * 
 * Does not send notifications to users: https://github.com/speedruncomorg/api/issues/124
 * 
 * Must be authenticated with a user with sufficient permissions (global mods or game mods).
 * 
 * PUT /runs/{id}/status https://github.com/speedruncomorg/api/blob/master/version1/runs.md#put-runsidstatus
 * 
 * @param id The id of the run to change.
 * @param status The new status of the run.
 * @param key The API key of the account to do the action with. Get it from <https://www.speedrun.com/settings/apikey>. Protect it.
 * @param options Options for the HTTP request itself.
*/
export async function setRunStatus(id: string, status: PutRunStatus['status'], key: string, options: HTTPOptions = {}): Promise<PutRunStatusResponse> {
	return http<PutRunStatusResponse, RunError>(`/runs/${id}/status`, 'put', key, { body: { status }, ...options });
}

/** Change the list of players that participated in a run.
 * 
 * The submitted list of players will replace the old list completely, i.e. you cannot simply add a player without also submitting the existing ones.
 * 
 * Must be authenticated with a user with sufficient permissions (global mods or game mods).
 * 
 * PUT /runs/{id}/players https://github.com/speedruncomorg/api/blob/master/version1/runs.md#put-runsidplayers
 * 
 * @param id The id of the run to change.
 * @param players The new list of players.
 * @param key The API key of the account to do the action with. Get it from <https://www.speedrun.com/settings/apikey>. Protect it.
 * @param options Options for the HTTP request itself.
*/
export async function setRunPlayers(id: string, players: PutRunPlayers['players'], key: string, options: HTTPOptions = {}): Promise<PutRunPlayersResponse> {
	return http<PutRunPlayersResponse, RunError>(`/runs/${id}/players`, 'put', key, { body: { players }, ...options });
}

/** This method allows an authenticated user to delete a run. Regular users can only delete their
 *  	own runs, whereas [global] mods can delete runs by other users as well.
 * 
 * Note that this is a destructive action.
 * 
 * Returns erroneuous 500 errors, even on successful delete: https://github.com/speedruncomorg/api/issues/137
 * By default, we ignore these responses. Set the `ignore500` field to `false` if you wish to throw these.
 * If set to `true` (which it is by default), this can return the 500 error if it occurs without interruption.
 * Check for it with isError (narrows the type).
 * 
 * DELETE /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#delete-runs
 * 
 * @param id The id of the run to delete.
 * @param key The API key of the account to delete with. Get it from <https://www.speedrun.com/settings/apikey>. Protect it.
 * @param options Options for the HTTP request itself.
 * @param ignore500 Whether or not to ignore the 500 error (which is always returned).
*/
export async function deleteRun(id: string, key: string, options: HTTPOptions = {}, ignore500 = true): Promise<RunError | Run> {
	try {
		// await to catch the error
		return await http<DeleteRunResponse>(`/runs/${id}`, 'delete', key, options).then(shimData);
	} catch (e) {
		// Ignore the 500 error if it occurs (erroneous)
		if (ignore500 && e instanceof SRCError && e.error.status === 500) return e.error as RunError;

		throw e;
	}
}