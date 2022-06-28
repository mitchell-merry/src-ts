import { paginatedGet } from '.';
import { Run, RunsParams, RunsResponse } from '../types';

/** This will return a list of all runs.
 * 
 * GET /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runs
 * 
 * @param options Optional query paramters to pass to the GET request.
 */
export async function getAllRuns(options?: RunsParams) {
	return paginatedGet<RunsResponse>(`/runs`, options);
}

/** Filter a list of runs by variables, as key-value pairs. */
export function filterRuns(runs: Run[], variables: Record<string, string> = {}) {
	return runs.filter(run => !Object.entries(variables).some(([variable, value]) => !(variable in run.values) || run.values[variable] !== value));
}