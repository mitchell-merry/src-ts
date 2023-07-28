import Bottleneck from 'bottleneck';
import fetch from 'node-fetch';
import { Data, Paginated, PaginatedData, PaginatedParams, ResponseError } from '../types';
import SRCError from './SRCError';
export const VERSION = "2.10.0";

const BASE_URL = "https://www.speedrun.com/api";

const bn = new Bottleneck({
	reservoir: 100,
	reservoirRefreshAmount: 100,
	reservoirRefreshInterval: 60 * 1000,
   
	maxConcurrent: 1,
	minTime: 333
});

export type RawHTTPOptions = {
	/** Body to be sent in the HTTP request to the server, as stringified JSON. Ignored on GET requests! */
	body?: any;
	/** Additional headers to be sent in the request.
	 * 
	 * By default, the following headers are sent. You can override any of them if you choose.
	 * * `Host`: `speedrun.com`
	 * * `Content-Type`: `application/json`
	 * * `User-Agent`: `src-ts/<VERSION>`
	 */
	headers?: Record<string, string>;
	/** Whether or not to log the HTTP request in console. Defaults to true. */
	log?: boolean;
}

export type HTTPType = 'get' | 'post' | 'put' | 'delete';

export type HTTPOptions = Omit<RawHTTPOptions, 'body'>;

export type GetOptions = HTTPOptions & {
	/** Whether or not to allow a cached response. Defaults to false.*/
	cache?: boolean;
};

export type PaginatedGetOptions<D, S = D> = GetOptions & {
	/** The max number of elements to fetch. Defaults to all elements.*/
	max?: number;
	/** A mapper function to map each retrieved element. */
	map?: (r: D) => S;
};

/** GET from url and paginate through results to return entire dataset */
export async function paginatedGet<T extends Paginated<any>, S = PaginatedData<T>>(
	url: string,
	queryParams?: PaginatedParams & Record<string, any>,
	options: PaginatedGetOptions<PaginatedData<T>, S> = {}
): Promise<Exclude<Awaited<S>, undefined>[]> {
	let { max, map, ...getOpts } = options;
	const { cache, ...httpOpts } = getOpts;
	const data: Exclude<Awaited<S>, undefined>[] = [];
	let next, response: T;
	
	if (max && max < 1) return [];
	map ??= r => r;

	do {
		response = next 
			? await rawHTTP<T>(next, 'get', httpOpts)
			: await get<T>(url, queryParams, getOpts); // initial request
		
		const newData = await Promise.all(response.data.map(map));

		data.push(...newData.filter((e): e is Exclude<typeof e, undefined> => e !== undefined));

		if (!!max && data.length >= max) return data.slice(0, max);
	}
	while(next = response.pagination.links.find(link => link.rel === 'next')?.uri);

	return data;
}

export async function get<Response, Err extends ResponseError = ResponseError>(url: string, queryParams: Record<string, any> = {}, options: GetOptions = {}, key?: string) {
	const { cache, ...opts } = options;
	// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
	// to prevent caching
	if(cache ?? false) queryParams["__cache__"] = (Math.random() + 1).toString(36).substring(7);
	
	if(Object.entries(queryParams).length != 0) {
		url += `?${Object.entries(queryParams).map(([k, v]) => `${k}=${v}`).join('&')}`;
	}

	return rawHTTP<Response, Err>(`${BASE_URL}/v1${url}`, 'get', { ...opts, headers: { ...(key ? { 'X-API-Key': key } : {}), ...opts.headers}});
}

export async function http<Response, Err extends ResponseError = ResponseError>(url: string, method: Exclude<HTTPType, 'get'>, key: string, options: RawHTTPOptions = {}) {
	return rawHTTP<Response, Err>(`${BASE_URL}/v1${url}`, method, { ...options, headers: { 'X-API-Key': key, ...options.headers } })
}

// entirely temporary, not good, very bad
export async function httpV2(url: string, method: HTTPType = 'get', PHPSESSID?: string, options: RawHTTPOptions = {}) {
    const headers = {
        'Cookie': `PHPSESSID=${PHPSESSID}`,
        ...options.headers,
    };

    return rawHTTP<unknown, any>(`${BASE_URL}/v2${url}`, method, {
        ...options,
        headers,
    })
}

export async function rawHTTP<Response, Err extends ResponseError = ResponseError>(url: string, method: HTTPType, options: RawHTTPOptions = {}) {
	if (options.log ?? true) console.log(`[src-ts] Requesting ${method.toUpperCase()} ${url}`);

	const body = (method === 'get' || !options.body) ? undefined : JSON.stringify(options.body);

	const res = await bn.schedule(() => fetch(url, {
		method,
		headers: {
			'Host': 'www.speedrun.com',
			'Content-Type': 'application/json',
			'User-Agent': `src-ts/${VERSION}`,
			...(options.headers ?? {})
		},
		body
	})).then(res => res.json()).then(res => {
		if (options.log ?? true) console.log(`[src-ts] Completed ${method.toUpperCase()} ${url}`);
		return res;
	}) as Response | Err;

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