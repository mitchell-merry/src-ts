import { Category, CategoryType, Game, GameCategoriesParams, GameCategoriesResponse, GameDerivedGamesParams, GameDerivedGamesResponse, GameLevelsParams, GameLevelsResponse, GameParams, GameRecordsParams, GameRecordsResponse, GameResponse, GamesParams, GamesResponse, GameVariablesParams, GameVariablesResponse, Leaderboard, Level, Variable } from "../../types";
import { get, paginatedGet, shimData } from "../http";

/** This will return a page of games, with the pagination data.
 *
 * Note that giving invalid values for `platform`, `region` or `moderator` to `options` will result in an HTTP 404 error instead of an empty list. 
 * 
 * GET /games https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-games
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
*/
export async function getGames<Embed extends string = "">(queryParams?: GamesParams): Promise<GamesResponse<Embed>> {
	return get<GamesResponse<Embed>>(`/games`, queryParams);
}

/** This will return a list of all games.
 *
 * Note that giving invalid values for `platform`, `region` or `moderator` to `options` will result in an HTTP 404 error instead of an empty list. 
 * 
 * GET /games https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-games
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
*/
export async function getAllGames<Embed extends string = "">(queryParams?: GamesParams): Promise<Game<Embed>[]> {
	return paginatedGet<GamesResponse<Embed>>(`/games`, queryParams);
}

/** This will retrieve a single game, identified by its ID. Instead of the game's ID, you can also specify the game's abbreviation.
 * 
 * GET /games/{id} https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesid
 * 
 * @param game The game's ID or abbreviation.
 * @param queryParams Optional query paramters to pass to the GET request.
 */
export async function getGame<Embed extends string = "">(game: string, queryParams?: GameParams): Promise<Game<Embed>> {
	return get<GameResponse<Embed>>(`/games/${game}`, queryParams).then(shimData);
}

/** This will retrieve all categories of a given game (the `id` can be either the game ID or its abbreviation). If you need only those applicable to certain levels, use getGameLevels.
 * 
 * GET /games/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidcategories
 * 
 * @param game The game's ID or abbreviation.
 * @param queryParams Optional query paramters to pass to the GET request.
 */
export async function getGameCategories<Embed extends string = "">(game: string, queryParams?: GameCategoriesParams): Promise<Category<Embed, CategoryType>[]> {
	return get<GameCategoriesResponse<Embed>>(`/games/${game}/categories`, queryParams).then(shimData);
}

/** This will retrieve all levels of a given game (the `id` can be either the game ID or its abbreviation).
 * 
 * GET /games/{id}/levels https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidlevels
 * 
 * @param game The game's ID or abbreviation.
 * @param queryParams Optional query paramters to pass to the GET request.
 */
export async function getGameLevels<Embed extends string = "">(game: string, queryParams?: GameLevelsParams): Promise<Level<Embed>[]> {
	return get<GameLevelsResponse<Embed>>(`/games/${game}/levels`, queryParams).then(shimData);
}

/** This will retrieve all variables of a given game (the `id` can be either the game ID or its abbreviation).
 * 
 * GET /games/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidvariables
 * 
 * @param game The game's ID or abbreviation.
 * @param queryParams Optional query paramters to pass to the GET request.
 */
export async function getGameVariables(game: string, queryParams?: GameVariablesParams): Promise<Variable[]> {
	return get<GameVariablesResponse>(`/games/${game}/variables`, queryParams).then(shimData);
}

/** This will retrieve all games that have the given game (the `id` can be either the game ID or its abbreviation) set as their base game.
 * 
 * GET /games/{id}/derived-games https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidderived-games
 * 
 * @param game The game's ID or abbreviation.
 * @param queryParams Optional query paramters to pass to the GET request.
 */
export async function getGameDerivedGames<Embed extends string = "">(game: string, queryParams?: GameDerivedGamesParams): Promise<Game<Embed>[]> {
	return get<GameDerivedGamesResponse<Embed>>(`/games/${game}/derived-games`, queryParams).then(shimData);
}

/** This will retrieve the records (first three places) for every (category,level) combination of the given game. 
 * 
 * GET /games/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidrecords
 * 
 * @param game The game's ID or abbreviation.
 * @param queryParams Optional query paramters to pass to the GET request.
 */
export async function getGameRecords<Embed extends string = "">(game: string, queryParams?: GameRecordsParams): Promise<Leaderboard<Embed>[]> {
	return get<GameRecordsResponse<Embed>>(`/games/${game}/records`, queryParams).then(shimData);
}