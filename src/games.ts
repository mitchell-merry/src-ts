import { errorOrData, get, paginatedGet } from '.';
import { GameCategoriesResponse, GameParams, GameResponse, GameCategoriesParams, GameLevelsParams, GameLevelsResponse, GamesParams, GamesResponse } from '../types';

/** This will return the first page of games, with the pagination data.
 *
 * Note that giving invalid values for `platform`, `region` or `moderator` to `options` will result in an HTTP 404 error instead of an empty list. 
 * 
 * GET /games https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-games
 * 
 * @param options Optional query paramters to pass to the GET request.
*/
export async function getGames(options?: GamesParams) {
	return get<GamesResponse>(`/games`, options);
}

/** This will return a list of all games.
 *
 * Note that giving invalid values for `platform`, `region` or `moderator` to `options` will result in an HTTP 404 error instead of an empty list. 
 * 
 * GET /games https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-games
 * 
 * @param options Optional query paramters to pass to the GET request.
*/
export async function getAllGames(options?: GamesParams) {
	return paginatedGet<GamesResponse>(`/games`, options);
}

/** This will retrieve a single game, identified by its ID. Instead of the game's ID, you can also specify the game's abbreviation.
 * 
 * GET /games/{id} https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesid
 * 
 * @param game The game's ID or abbreviation.
 * @param options Optional query paramters to pass to the GET request.
 */
export async function getGame(game: string, options?: GameParams) {
	return get<GameResponse>(`/games/${game}`, options).then(errorOrData);
}

/** This will retrieve all categories of a given game (the id can be either the game ID or its abbreviation). If you need only those applicable to certain levels, use getGameLevels.
 * 
 * GET /games/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidcategories
 * 
 * @param game The game's ID or abbreviation.
 * @param options Optional query paramters to pass to the GET request.
 */
export async function getGameCategories(game: string, options?: GameCategoriesParams) {
	return get<GameCategoriesResponse>(`/games/${game}/categories`, options).then(errorOrData);
}

/** This will retrieve all levels of a given game (the id can be either the game ID or its abbreviation).
 * 
 * GET /games/{id}/levels https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidlevels
 * 
 * @param game The game's ID or abbreviation.
 * @param options Optional query paramters to pass to the GET request.
*/
export async function getGameLevels(game: string, options?: GameLevelsParams) {
	return get<GameLevelsResponse>(`/games/${game}/levels`, options);
}