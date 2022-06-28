import { paginatedGet } from '.';
import { RunsParams, RunsResponse } from '../types';

/** Get ALL runs from a certain endpoint. Passing no options results in a 400 error. */
export async function getAllRuns(options?: RunsParams) {
	return paginatedGet<RunsResponse>(`/runs`, options);
}