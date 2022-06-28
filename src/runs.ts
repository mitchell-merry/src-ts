import { paginatedGet } from '.';
import { Run, RunsParams, RunsResponse } from '../types';

/** Get ALL runs from a certain endpoint. */
export async function getAllRuns(options?: RunsParams) {
	return paginatedGet<RunsResponse>(`/runs`, options);
}

/** Filter a list of runs by variables */
export function filterRuns(runs: Run[], variables: Record<string, string> = {}) {
	return runs.filter(run => !Object.entries(variables).some(([variable, value]) => !(variable in run.values) || run.values[variable] !== value));
}