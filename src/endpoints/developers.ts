import { Developer, DeveloperResponse, DevelopersParams, DevelopersResponse } from "../../types";
import { get, GetOptions, paginatedGet, PaginatedGetOptions, shimData } from "../http";

/** This will return a page of developers, with the pagination data.
 * 
 * GET /developers https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-developers
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getDevelopers(queryParams?: DevelopersParams, options?: GetOptions): Promise<DevelopersResponse> {
	return get<DevelopersResponse>(`/developers`, queryParams, options);
}

/** This will return all developers.
 * 
 * GET /developers https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-developers
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getAllDevelopers<S = Developer>(queryParams?: DevelopersParams, options?: PaginatedGetOptions<Developer, S>): Promise<NonNullable<Awaited<S>>[]> {
	return paginatedGet<DevelopersResponse, S>(`/developers`, queryParams, options);
}

/** This will retrieve a single developer, identified by its ID.
 * 
 * GET /developers/{id} https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-developersid
 * 
 * @param developer The developer's ID.
 * @param options Options for the HTTP request itself.
 */
export async function getDeveloper(developer: string, options?: GetOptions): Promise<Developer> {
	return get<DeveloperResponse>(`/developers/${developer}`, {}, options).then(shimData);
}
