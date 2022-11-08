import { Category, Leaderboard, Level, LevelCategoriesParams, LevelCategoriesResponse, LevelParams, LevelRecordsParams, LevelRecordsResponse, LevelResponse, LevelVariablesParams, LevelVariablesResponse, Variable } from "../../types";
import { get, GetOptions, paginatedGet, PaginatedGetOptions, shimData } from "../http";

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

/** This will retrieve the first page of records (first three places) of the given level for all available categories.
 * 
 * GET /levels/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidrecords
 * 
 * @param level The level's ID.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getLevelRecords<Embed extends string = "">(level: string, queryParams?: LevelRecordsParams<Embed>, options?: GetOptions): Promise<LevelRecordsResponse<Embed>> {
	return get<LevelRecordsResponse<Embed>>(`/levels/${level}/records`, queryParams, options);
}

/** This will retrieve all of the records (first three places) of the given level for all available categories.
 * 
 * GET /levels/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidrecords
 * 
 * @param level The level's ID.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getAllLevelRecords<Embed extends string = "", S = Leaderboard<Embed>>(level: string, queryParams?: LevelRecordsParams<Embed>, options?: PaginatedGetOptions<Leaderboard<Embed>, S>): Promise<Awaited<S>[]> {
	return paginatedGet<LevelRecordsResponse<Embed>, S>(`/levels/${level}/records`, queryParams, options);
}