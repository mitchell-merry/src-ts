import { Category, CategoryParams, CategoryRecordsParams, CategoryRecordsResponse, CategoryResponse, CategoryVariablesParams, CategoryVariablesResponse } from "../../types";
import { get, shimData } from "../http";

/** This will retrieve a single category, identified by its ID.
 * 
 *  GET /categories/{id} https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesid
 * 
 * @param category The category's ID.
 * @param options Optional query paramters to pass to the GET request.
 */
export async function getCategory<Embed extends string = "">(category: string, queryParams?: CategoryParams) {
	return get<CategoryResponse<Embed>>(`/categories/${category}`, queryParams).then(shimData);
}

/** This will retrieve all variables that are applicable to the given category.
 * 
 * GET /categories/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesidvariables
 * 
 * @param category The category's ID.
 * @param queryParams Optional query paramters to pass to the GET request.
*/
export async function getCategoryVariables(category: string, queryParams?: CategoryVariablesParams) {
	return get<CategoryVariablesResponse>(`/categories/${category}/variables`, queryParams).then(shimData);
}

/** This will retrieve the records (first three places) of the given category. If it's a full-game category, the result will be a list containing one leaderboard, otherwise the result will contain one leaderboard for each level of the game the category belongs to.
 * 
 * GET /categories/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesidrecords
 * 
 * @param category The category's ID or abbreviation.
 * @param queryParams Optional query paramters to pass to the GET request.
 */
export async function getCategoryRecords<Embed extends string = "">(category: string, queryParams?: CategoryRecordsParams) {
	return get<CategoryRecordsResponse<Embed>>(`/categories/${category}/records`, queryParams);
}

/** Type guard for category type */
export function categoryIsFullGame(category: Category): category is Category & { type: 'per-game' } {
	return category.type === 'per-game';
}