import { Variable, SRCError, CategoryVariablesResponse, CategoryVariablesParams } from '../types';
import { get, isError } from '.';

export async function getCategoryVariables(category_id: string, options?: CategoryVariablesParams): Promise<Variable[] | SRCError> {
	const res = await get<CategoryVariablesResponse>(`/categories/${category_id}/variables`, options);

	if(isError(res)) return res;

	return res.data;
}