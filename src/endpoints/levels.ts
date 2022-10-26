import { Category, LevelCategoriesParams, LevelCategoriesResponse } from "../../types";
import { get, GetOptions, shimData } from "../http";

/** This will retrieve the applicable categories for the given level.
 * 
 * GET /levels/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidcategories
 * 
 * @param level The level's ID.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
 export async function getLevelCategories<Embed extends string = "">(level: string, queryParams?: LevelCategoriesParams<Embed>, options?: GetOptions): Promise<Category<Embed, "per-level">[]> {
	return get<LevelCategoriesResponse<Embed>>(`/levels/${level}/categories`, queryParams, options).then(shimData);
}