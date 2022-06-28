import { paginatedGet } from '.';
import { RunsParams, RunsResponse } from '../types';

/** Get ALL runs from a certain endpoint. */
export async function getAllRuns(options?: RunsParams) {
	return paginatedGet<RunsResponse>(`/runs`, options);
}