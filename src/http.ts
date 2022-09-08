import Bottleneck from 'bottleneck';
import fetch from 'node-fetch';
import { Data, Paginated, PaginatedData, PaginatedParams, ResponseError } from '../types';
import SRCError from './SRCError';

const BASE_URL = "https://www.speedrun.com/api/v1";

const bn = new Bottleneck({
	reservoir: 100,
	reservoirRefreshAmount: 100,
	reservoirRefreshInterval: 60 * 1000,
   
	maxConcurrent: 1,
	minTime: 333
});

type HTTPOptions = {
	body?: any,
	headers?: Record<string, string>
}

type GetOptions = HTTPOptions & { cache?: boolean }
type HTTPType = 'get' | 'post' | 'put' | 'delete';

/** GET from url and paginate through results to return entire dataset */
export async function paginatedGet<T extends Paginated<any>>(url: string, queryParams?: PaginatedParams & Record<string, any>, options: GetOptions = {}): Promise<PaginatedData<T>[]> {
	let data: PaginatedData<T>[] = [];
	let next, response;
	const { cache, ...opts } = options;

	do {
		response = next 
			? await rawHTTP<T>(next, 'get', opts)
			: await get<T>(url, queryParams, options); // initial request
		
		if(isError(response)) throw new SRCError(response);

		data = [...data, ...response.data];
	}
	while(next = response.pagination.links.find(link => link.rel === 'next')?.uri);

	return data;
}

export async function get<Response, Err extends ResponseError = ResponseError>(url: string, queryParams: Record<string, any> = {}, options: GetOptions = {}) {
	const { cache, ...opts } = options;
	// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
	// to prevent caching
	if(!!cache) queryParams["__cache__"] = (Math.random() + 1).toString(36).substring(7);
	
	if(Object.entries(queryParams).length != 0) {
		url += `?${Object.entries(queryParams).map(([k, v]) => `${k}=${v}`).join('&')}`;
	}

	return rawHTTP<Response, Err>(`${BASE_URL}${url}`, 'get', opts);
}

export async function http<Response, Err extends ResponseError = ResponseError>(url: string, method: Exclude<HTTPType, 'get'>, key: string, options: HTTPOptions = {}) {
	return rawHTTP<Response, Err>(`${BASE_URL}${url}`, method, { ...options, headers: { 'X-API-Key': key, ...options.headers } })
}

export async function rawHTTP<Response, Err extends ResponseError = ResponseError>(url: string, method: HTTPType, options: HTTPOptions = { headers: {}, body: {} }) {
	console.log(`[src-ts] '${method.toUpperCase()}'ing ${url}...`);

	const res = await bn.schedule(() => fetch(url, {
		method,
		headers: {
			'Host': 'www.speedrun.com',
			'Content-Type': 'application/json',
			'User-Agent': `src-ts/1.5.0`,
			...options.headers
		},
		body: JSON.stringify(options.body)
	})).then(res => res.json()) as Response | Err;

	if(isError(res)) throw new SRCError(res);

	return res;
}

/** Checks if the given object is an SRCError or not. SRC responses will never have a status object in them at the root level. */
export function isError(obj: any): obj is ResponseError {
	return !!obj && typeof obj === "object"
		&& 'status' in obj && typeof obj.status === "number"
		&& 'message'in obj && typeof obj.message === "string"
		&& 'links' in obj && Array.isArray(obj.links);
}

export function shimData<T>(obj: Data<T>) { return obj.data; }