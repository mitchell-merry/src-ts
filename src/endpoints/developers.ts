import { Developer, DeveloperResponse } from "../../types";
import { get, GetOptions, shimData } from "../http";

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