import Bottleneck from 'bottleneck';
import fetch from 'node-fetch';
import { Data, SRCError } from '../types';

export * from './user';
export * from './game';
export * from './category';
export * from './leaderboard';

const fetchSRC = new Bottleneck({
	reservoir: 100,
	reservoirRefreshAmount: 100,
	reservoirRefreshInterval: 60 * 1000,
   
	maxConcurrent: 1,
	minTime: 333
}).wrap(fetch);

const BASE_URL = "https://www.speedrun.com/api/v1";

/** Generic GET request generator. Bottlenecks itself to 100 requests a minute. */
export async function get<Response>(url: string, options: Record<string, any> = {}): Promise<Response | SRCError> {
	url = `${BASE_URL}${url}`;
	
	if(Object.entries(options).length != 0) {
		url += `?${Object.entries(options).map(([k, v]) => `${k}=${v}`).join('&')}`;
	}

	console.log(`[SRC] Fetching "${url}"`);
	const res = await fetchSRC(url).then(res => res.json()) as Response | SRCError;
	
	return res;
}

/** Checks if the given object is an SRCError or not. SRC responses will never have a status object in them at the root level. */
export function isError(obj: any): obj is SRCError {
	return !!obj && typeof obj === "object"
		&& 'status' in obj;
}

/** Decapsulates a data object if it is one, otherwise returns the error. */
export function errorOrData<T>(obj: Data<T> | SRCError): T | SRCError {
	return isError(obj) ? obj : obj.data;
}