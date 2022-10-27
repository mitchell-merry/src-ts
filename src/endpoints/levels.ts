import { Category, Level, LevelCategoriesParams, LevelCategoriesResponse, LevelParams, LevelResponse, LevelVariablesParams, LevelVariablesResponse, Variable } from "../../types";
import { get, GetOptions, shimData } from "../http";

/** This will retrieve a single level, identified by its ID.
 * 
 * GET /levels/{id} https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsid
 * 
 * @param level The level's ID.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
 export async function getLevel<Embed extends string = "">(level: string, queryParams?: LevelParams<Embed>, options?: GetOptions): Promise<Level<Embed>> {
	return get<LevelResponse<Embed>>(`/levels/${level}`, queryParams, options).then(shimData);
}

/** This will retrieve the applicable [categories](https://github.com/speedruncomorg/api/blob/master/version1/categories.md) for the given level.
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

/** This will retrieve the applicable [variables](https://github.com/speedruncomorg/api/blob/master/version1/variables.md) for the given level.
 * 
 * GET /levels/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidvariables
 * 
 * @param level The level's ID.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
 export async function getLevelVariables(level: string, queryParams?: LevelVariablesParams, options?: GetOptions): Promise<Variable[]> {
	return get<LevelVariablesResponse>(`/levels/${level}/variables`, queryParams, options).then(shimData);
}