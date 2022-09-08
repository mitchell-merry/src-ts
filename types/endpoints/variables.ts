import { Variable } from "../resources";
import { Data } from "../other";

/** GET /variables/{id} https://github.com/speedruncomorg/api/blob/master/version1/variables.md#get-variablesid */
export type VariableResponse = Data<Variable>;