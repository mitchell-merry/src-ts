import { Platform, PlatformResponse, PlatformsParams, PlatformsResponse } from "../../types";
import { get, GetOptions, paginatedGet, PaginatedGetOptions, shimData } from "../http";

/** This will return a page of platforms, with the pagination data.
 * 
 * GET /platforms https://github.com/speedruncomorg/api/blob/master/version1/platforms.md#get-platforms
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getPlatforms(queryParams?: PlatformsParams, options?: GetOptions): Promise<PlatformsResponse> {
	return get<PlatformsResponse>(`/platforms`, queryParams, options);
}

/** This will return all platforms.
 * 
 * GET /platforms https://github.com/speedruncomorg/api/blob/master/version1/platforms.md#get-platforms
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getAllPlatforms<S = Platform>(queryParams?: PlatformsParams, options?: PaginatedGetOptions<Platform, S>): Promise<S[]> {
	return paginatedGet<PlatformsResponse, S>(`/platforms`, queryParams, options);
}

/** This will retrieve a single platform, identified by its ID.
 * 
 * GET /platforms/{id} https://github.com/speedruncomorg/api/blob/master/version1/platforms.md#get-platformsid
 * 
 * @param platform The platform's ID.
 * @param options Options for the HTTP request itself.
 */
export async function getPlatform(platform: string, options?: GetOptions): Promise<Platform> {
	return get<PlatformResponse>(`/platforms/${platform}`, {}, options).then(shimData);
}
