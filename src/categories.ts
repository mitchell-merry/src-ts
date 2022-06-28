import { errorOrData, get } from '.';
import { CategoryVariablesResponse, CategoryVariablesParams, Category } from '../types';

/** Get all the variables associated to a category. */
export async function getCategoryVariables(category: string, options?: CategoryVariablesParams) {
	return get<CategoryVariablesResponse>(`/categories/${category}/variables`, options).then(errorOrData);
}

/** Type guard for category type */
export function categoryIsFullGame(category: Category): category is Category & { type: 'per-game' } {
	return category.type === 'per-game';
}