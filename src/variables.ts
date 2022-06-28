import { Variable } from '../types';

/** Type guard for checking if the given variable is a subcategory or not.
 * Note: Not sure if this guarantees .values.default to be not null.
 */
export function variableIsSubcategory (variable: Variable): variable is Variable & { 'is-subcategory': true } {
	return variable['is-subcategory'];
}