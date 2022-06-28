import { errorOrData, get } from '.';
import { CategoryVariablesResponse, CategoryVariablesParams, Category } from '../types';

/** This will retrieve all variables that are applicable to the given category.
 * 
 * GET /categories/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesidvariables
 * 
 * @param category The category's ID.
 * @param options Optional query paramters to pass to the GET request.
*/
export async function getCategoryVariables(category: string, options?: CategoryVariablesParams) {
	return get<CategoryVariablesResponse>(`/categories/${category}/variables`, options).then(errorOrData);
}

/** Type guard for category type */
export function categoryIsFullGame(category: Category): category is Category & { type: 'per-game' } {
	return category.type === 'per-game';
}