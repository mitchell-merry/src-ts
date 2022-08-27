import Bottleneck from 'bottleneck';
import fetch from 'node-fetch';
import { Data, Paginated, PaginatedData, PaginatedParams, RunsResponse, SRCError } from '../types';

export * from './users';
export * from './games';
export * from './categories';
export * from './leaderboards';
export * from './runs';
export * from './variables';

const BASE_URL = "https://www.speedrun.com/api/v1";

const bn = new Bottleneck({
	reservoir: 100,
	reservoirRefreshAmount: 100,
	reservoirRefreshInterval: 60 * 1000,
   
	maxConcurrent: 1,
	minTime: 333
});
const fetchSRC = bn.wrap(fetch);

/** Configuration options to use for the project. Change as soon as you can in your project. */
export const CONFIG = {
	/** Whether or not to log the queries performed by src-ts. */
	log: true,
	/** Whether the library should throw an error when a request fails. */
	throw: false,
};

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
	
	// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
	// to prevent caching
	options["__cache__"] = (Math.random() + 1).toString(36).substring(7);

	if(Object.entries(options).length != 0) {
		url += `?${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('&')}`;
	}
	return rawGet<Response>(url);
}

export async function rawGet<Response>(url: string) {
	if(CONFIG.log) console.log(`[src-ts] Fetching "${url}"`);

	return fetchSRC(url).then(res => res.json()) as Promise<Response | SRCError>;
}

export async function post<Response>(url: string, body: any, key: string) {
	url = `${BASE_URL}${url}`;

	return rawPost<Response>(url, body, {
		'Host': 'www.speedrun.com',
		'Content-Type': 'application/json',
		'X-API-Key': key
	});
}

export async function rawPost<Response>(url: string, body: any, headers: Record<string, string> = {}) {
	if(CONFIG.log) console.log(`[src-ts] Posting to "${url}..."`);

	return await bn.schedule(() => fetch(url, { 
		method: 'post', headers,
		body: JSON.stringify(body),
	})).then(res => res.json()) as Promise<Response | SRCError>;
}

export async function del<Response>(url: string, body: any, key: string) {
	url = `${BASE_URL}${url}`;

	return rawDelete<Response>(url, body, {
		'Host': 'www.speedrun.com',
		'Content-Type': 'application/json',
		'X-API-Key': key
	});
}

export async function rawDelete<Response>(url: string, body: any, headers: Record<string, string> = {}) {
	if(CONFIG.log) console.log(`[src-ts] Deleting "${url}..."`);

	return await bn.schedule(() => fetch(url, { 
		method: 'delete', headers,
		body: JSON.stringify(body),
	})).then(res => res.json()) as Promise<Response | SRCError>;
}


/** Checks if the given object is an SRCError or not. SRC responses will never have a status object in them at the root level. */
export function isError(obj: any): obj is SRCError {
	return !!obj && typeof obj === "object" && Object.keys(obj).length === 3
		&& 'status' in obj && typeof obj.status === "number"
		&& 'message'in obj && typeof obj.message === "string"
		&& 'links' in obj && Array.isArray(obj.links) && obj.links.length === 2;
}

/** Decapsulates a data object if it is one, otherwise returns the error. */
export function errorOrData<T>(obj: Data<T> | SRCError) {
	const err = isError(obj);
	if(CONFIG.throw && err) throw new Error(`SRCError ${obj.status}: ${obj.message}`);

	return err ? obj : obj.data;
}