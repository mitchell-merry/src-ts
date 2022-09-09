import { LevelCategoriesParams, LevelCategoriesResponse } from "../../types";
import { get } from "../http";

/** This will retrieve the applicable categories for the given level.
 * 
 * GET /levels/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidcategories
 * 
 * @param level The level's ID.
 * @param queryParams Optional query paramters to pass to the GET request.
 */
 export async function getLevelCategories<Embed extends string = "">(level: string, queryParams?: LevelCategoriesParams) {
	return get<LevelCategoriesResponse<Embed>>(`/levels/${level}/categories`, queryParams);
}