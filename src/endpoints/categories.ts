import { Category, CategoryParams, CategoryRecordsParams, CategoryRecordsResponse, CategoryResponse, CategoryType, CategoryVariablesParams, CategoryVariablesResponse, Variable } from "../../types";
import { get, GetOptions, shimData } from "../http";

/** This will retrieve a single category, identified by its ID.
 * 
 *  GET /categories/{id} https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesid
 * 
 * @param category The category's ID.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getCategory<Embed extends string = "">(category: string, queryParams?: CategoryParams<Embed>, options?: GetOptions): Promise<Category<Embed, CategoryType>> {
	return get<CategoryResponse<Embed>>(`/categories/${category}`, queryParams, options).then(shimData);
}

/** This will retrieve all variables that are applicable to the given category.
 * 
 * GET /categories/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesidvariables
 * 
 * @param category The category's ID.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
*/
export async function getCategoryVariables(category: string, queryParams?: CategoryVariablesParams, options?: GetOptions): Promise<Variable[]> {
	return get<CategoryVariablesResponse>(`/categories/${category}/variables`, queryParams, options).then(shimData);
}

/** This will retrieve the records (first three places) of the given category. If it's a full-game category, the result will be a list containing one leaderboard, otherwise the result will contain one leaderboard for each level of the game the category belongs to.
 * 
 * GET /categories/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesidrecords
 * 
 * @param category The category's ID or abbreviation.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getCategoryRecords<Embed extends string = "">(category: string, queryParams?: CategoryRecordsParams<Embed>, options?: GetOptions): Promise<CategoryRecordsResponse<Embed>> {
	return get<CategoryRecordsResponse<Embed>>(`/categories/${category}/records`, queryParams, options);
}

/** Type guard for category type */
export function categoryIsFullGame<E extends string>(category: Category<E>): category is Category<E, "per-game"> {
	return category.type === 'per-game';
}

/** Type guard for category type */
export function categoryIsLevel<E extends string>(category: Category<E>): category is Category<E, "per-level"> {
	return category.type === 'per-level';
}