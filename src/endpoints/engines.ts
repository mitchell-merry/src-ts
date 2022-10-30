import { Engine, EngineResponse, EnginesParams, EnginesResponse } from "../../types";
import { get, GetOptions, paginatedGet, PaginatedGetOptions, shimData } from "../http";

/** This will return a page of engines, with the pagination data.
 * 
 * GET /engines https://github.com/speedruncomorg/api/blob/master/version1/engines.md#get-engines
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getEngines(queryParams?: EnginesParams, options?: GetOptions): Promise<EnginesResponse> {
	return get<EnginesResponse>(`/engines`, queryParams, options);
}

/** This will return all engines.
 * 
 * GET /engines https://github.com/speedruncomorg/api/blob/master/version1/engines.md#get-engines
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getAllEngines<S = Engine>(queryParams?: EnginesParams, options?: PaginatedGetOptions<Engine, S>): Promise<S[]> {
	return paginatedGet<EnginesResponse, S>(`/engines`, queryParams, options);
}

/** This will retrieve a single engine, identified by its ID.
 * 
 * GET /engines/{id} https://github.com/speedruncomorg/api/blob/master/version1/engines.md#get-enginesid
 * 
 * @param engine The engine's ID.
 * @param options Options for the HTTP request itself.
 */
export async function getEngine(engine: string, options?: GetOptions): Promise<Engine> {
	return get<EngineResponse>(`/engines/${engine}`, {}, options).then(shimData);
}
