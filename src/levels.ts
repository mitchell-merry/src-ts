import { get } from ".";
import { LevelCategoriesParams, LevelCategoriesResponse } from "../types";

/** This will retrieve the applicable categories for the given level.
 * 
 * GET /levels/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidcategories 
 */
export async function getLevelCategories(level: string, options?: LevelCategoriesParams) {
	return get<LevelCategoriesResponse>(`/levels/${level}/categories`, options);
}