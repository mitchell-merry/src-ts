import { Region, RegionResponse, RegionsParams, RegionsResponse } from "../../types";
import { get, GetOptions, paginatedGet, PaginatedGetOptions, shimData } from "../http";

/** This will return a page of regions, with the pagination data.
 * 
 * GET /regions https://github.com/speedruncomorg/api/blob/master/version1/regions.md#get-regions
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getRegions(queryParams?: RegionsParams, options?: GetOptions): Promise<RegionsResponse> {
	return get<RegionsResponse>(`/regions`, queryParams, options);
}

/** This will return all regions.
 * 
 * GET /regions https://github.com/speedruncomorg/api/blob/master/version1/regions.md#get-regions
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getAllRegions(queryParams?: RegionsParams, options?: PaginatedGetOptions): Promise<Region[]> {
	return paginatedGet<RegionsResponse>(`/regions`, queryParams, options);
}

/** This will retrieve a single region, identified by its ID.
 * 
 * GET /regions/{id} https://github.com/speedruncomorg/api/blob/master/version1/regions.md#get-regionsid
 * 
 * @param region The region's ID.
 * @param options Options for the HTTP request itself.
 */
export async function getRegion(region: string, options?: GetOptions): Promise<Region> {
	return get<RegionResponse>(`/regions/${region}`, {}, options).then(shimData);
}
