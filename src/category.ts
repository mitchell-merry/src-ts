import { errorOrData, get } from '.';
import { CategoryVariablesResponse, CategoryVariablesParams } from '../types';

/** Get all the variables associated to a category. */
export async function getCategoryVariables(category: string, options?: CategoryVariablesParams) {
	return get<CategoryVariablesResponse>(`/categories/${category}/variables`, options).then(errorOrData);
}