import { GameType, GameTypeResponse, GameTypesParams, GameTypesResponse } from "../../types";
import { get, GetOptions, paginatedGet, PaginatedGetOptions, shimData } from "../http";

/** This will return a page of game types, with the pagination data.
 * 
 * GET /gametypes https://github.com/speedruncomorg/api/blob/master/version1/gametypes.md#get-gametypes
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getGameTypes(queryParams?: GameTypesParams, options?: GetOptions): Promise<GameTypesResponse> {
	return get<GameTypesResponse>(`/gametypes`, queryParams, options);
}

/** This will return all game types.
 * 
 * GET /gametypes https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-gametypes
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getAllGameTypes<S = GameType>(queryParams?: GameTypesParams, options?: PaginatedGetOptions<GameType, S>): Promise<Awaited<S>[]> {
	return paginatedGet<GameTypesResponse, S>(`/gametypes`, queryParams, options);
}

/** This will retrieve a single game type, identified by its ID.
 * 
 * GET /gametypes/{id} https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-gametypesid
 * 
 * @param gametype The gametype's ID.
 * @param options Options for the HTTP request itself.
 */
export async function getGameType(gametype: string, options?: GetOptions): Promise<GameType> {
	return get<GameTypeResponse>(`/gametypes/${gametype}`, {}, options).then(shimData);
}
