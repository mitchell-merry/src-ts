import { errorOrData, get } from '.';
import { Variable, SRCError, CategoryVariablesResponse, CategoryVariablesParams } from '../types';

export async function getCategoryVariables(category_id: string, options?: CategoryVariablesParams): Promise<Variable[] | SRCError> {
	return get<CategoryVariablesResponse>(`/categories/${category_id}/variables`, options).then(errorOrData);
}