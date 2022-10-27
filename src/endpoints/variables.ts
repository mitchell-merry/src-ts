import { Variable, VariableResponse } from "../../types";
import { get, GetOptions, shimData } from "../http";

export async function getVariable(variable: string, options?: GetOptions): Promise<Variable> {
	return get<VariableResponse>(`/variables/${variable}`, {}, options).then(shimData);
}