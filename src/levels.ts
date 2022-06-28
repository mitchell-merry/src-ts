import { get } from ".";
import { LevelCategoriesParams, LevelCategoriesResponse } from "../types";

/** This will retrieve the applicable categories for the given level.
 * 
 * GET /levels/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidcategories
 * 
 * @param level The level's ID.
 * @param options Optional query paramters to pass to the GET request.
 */
export async function getLevelCategories(level: string, options?: LevelCategoriesParams) {
	return get<LevelCategoriesResponse>(`/levels/${level}/categories`, options);
}