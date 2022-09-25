import { DeleteRunResponse, PostRun, PostRunResponse, PutRunStatus, PutRunStatusResponse, Run, RunError, RunParams, RunResponse, RunsParams, RunsResponse } from "../../types";
import { get, http, paginatedGet, shimData } from "../http";
import SRCError from "../SRCError";

/** This will return a list of all runs.
 * 
 * GET /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runs
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 */
 export async function getAllRuns<Embed extends string = "">(queryParams?: RunsParams): Promise<Run<Embed>[]> {
	return paginatedGet<RunsResponse<Embed>>(`/runs`, queryParams);
}

/** This will return a single run based on id.
 * 
 * GET /runs/id https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runsid
 * 
 * @param id ID of the run to get.
 * @param queryParams Optional query paramters to pass to the GET request.
 */
 export async function getRun<Embed extends string = "">(id: string, queryParams?: RunParams): Promise<Run<Embed>> {
	return get<RunResponse<Embed>>(`/runs/${id}`, queryParams).then(shimData);
}

/** Submit a run to speedrun.com. Only super moderators can auto-verify.
 * 
 * POST /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#post-runs
 * 
 * @param run The run to submit.
 * @param key The API key of the account to submit with. Get it from <https://www.speedrun.com/user/USERNAMEHERE/settings/apikey>. Protect it.
*/
export function submitRun(run: PostRun, key: string): Promise<PostRunResponse> {
	return http<PostRunResponse, RunError>('/runs', 'post', key, { body: { run } });
}

/** Change the status of a run.
 * 
 * Does not send notifications to users: https://github.com/speedruncomorg/api/issues/124
 * 
 * PUT /runs/{id}/status https://github.com/speedruncomorg/api/blob/master/version1/runs.md#post-runs
 * 
 * @param id The id of the run to change.
 * @param status The new status of the run.
 * @param key The API key of the account to do the action with. Get it from <https://www.speedrun.com/user/USERNAMEHERE/settings/apikey>. Protect it.
*/
export async function setRunStatus(id: string, status: PutRunStatus['status'], key: string): Promise<PutRunStatusResponse> {
	return http<PutRunStatusResponse, RunError>(`/runs/${id}/status`, 'put', key, { body: { status }});
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
 * @param key The API key of the account to submit with. Get it from <https://www.speedrun.com/user/USERNAMEHERE/settings/apikey>. Protect it.
 * @param ignore500 Whether or not to ignore the 500 error (which is always returned).
*/
export async function deleteRun(id: string, key: string, ignore500 = true): Promise<RunError | Run> {
	try {
		// await to catch the error
		return await http<DeleteRunResponse>(`/runs/${id}`, 'delete', key).then(shimData);
	} catch (e) {
		// Ignore the 500 error if it occurs (erroneous)
		if (ignore500 && e instanceof SRCError && e.error.status === 500) return e.error as RunError;

		throw e;
	}
}