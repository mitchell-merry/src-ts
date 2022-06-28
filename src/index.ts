import Bottleneck from 'bottleneck';
import fetch from 'node-fetch';
import { Data, Paginated, PaginatedData, PaginatedParams, RunsResponse, SRCError } from '../types';

export * from './user';
export * from './game';
export * from './category';
export * from './leaderboard';
export * from './runs';

const BASE_URL = "https://www.speedrun.com/api/v1";

const fetchSRC = new Bottleneck({
	reservoir: 100,
	reservoirRefreshAmount: 100,
	reservoirRefreshInterval: 60 * 1000,
   
	maxConcurrent: 1,
	minTime: 333
}).wrap(fetch);

/** GET from url and paginate through results to return entire dataset */
export async function paginatedGet<T extends Paginated<any>>(url: string, options?: PaginatedParams & Record<string, any>): Promise<PaginatedData<T>[] | SRCError> {
	let data: PaginatedData<T>[] = [];
	let next, response;

	do {
		response = next 
			? await rawGet<T>(next)
			: await get<T>(url, options); // initial request
		
		if(isError(response)) return response;

		data = [...data, ...response.data];
	}
	while(next = response.pagination.links.find(link => link.rel === 'next')?.uri);

	return data;
}

/** Generic GET request generator. Bottlenecks itself to 100 requests a minute. */
export async function get<Response>(url: string, options: Record<string, any> = {}): Promise<Response | SRCError> {
	url = `${BASE_URL}${url}`;
	
	if(Object.entries(options).length != 0) {
		url += `?${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('&')}`;
	}
	return rawGet(url);
}

export async function rawGet<Response>(url: string) {
	console.log(`[SRC] Fetching "${url}"`);

	return fetchSRC(url).then(res => res.json()) as Promise<Response | SRCError>;
}

/** Checks if the given object is an SRCError or not. SRC responses will never have a status object in them at the root level. */
export function isError(obj: any): obj is SRCError {
	return !!obj && typeof obj === "object"
		&& 'status' in obj;
}

/** Decapsulates a data object if it is one, otherwise returns the error. */
export function errorOrData<T>(obj: Data<T> | SRCError) {
	return isError(obj) ? obj : obj.data;
}