import { DeleteRunResponse, PostRun, PostRunResponse, Run, RunError, RunResponse, RunsParams, RunsResponse } from "../../types";
import { get, http, paginatedGet, shimData } from "../http";

/** This will return a list of all runs.
 * 
 * GET /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runs
 * 
 * @param options Optional query paramters to pass to the GET request.
 */
 export async function getAllRuns(options?: RunsParams) {
	return paginatedGet<RunsResponse>(`/runs`, options);
}

/** This will return a single run based on id.
 * 
 * GET /runs/id https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runsid
 * 
 * @param id ID of the run to get.
 */
 export async function getRun(id: string) {
	return get<RunResponse>(`/runs/${id}`).then(shimData);
}

/** Submit a run to speedrun.com. Only super moderators can auto-verify.
 * 
 * POST /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#post-runs
 * 
 * @param run The run to submit.
 * @param key The API key of the account to submit with. Get it from <https://www.speedrun.com/user/USERNAMEHERE/settings/apikey>. Protect it.
*/
export function submitRun(run: PostRun, key: string) {
	return http<PostRunResponse, RunError>('/runs', 'post', key, { body: { run } });
}

/** This method allows an authenticated user to delete a run. Regular users can only delete their
 *  	own runs, whereas [global] mods can delete runs by other users as well.
 * 
 * Note that this is a destructive action.
 * 
 * DELETE /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#delete-runs
 * 
 * @param id The id of the run to delete.
 * @param key The API key of the account to submit with. Get it from <https://www.speedrun.com/user/USERNAMEHERE/settings/apikey>. Protect it.
*/
export function deleteRun(id: string, key: string) {
	return http<DeleteRunResponse>(`/runs/${id}`, 'delete', key).then(shimData);
}