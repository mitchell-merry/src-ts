import { errorOrData, get } from '.';
import { GameCategoriesResponse, GameParams, GameResponse, GameCategoriesParams } from '../types';

/** Get a Game. */
export async function getGame(game: string, options?: GameParams) {
	return get<GameResponse>(`/games/${game}`, options).then(errorOrData);
}

/** Get all categories that belong to a game. Does not filter by category type. */
export async function getGameCategories(game: string, options?: GameCategoriesParams) {
	return get<GameCategoriesResponse>(`/games/${game}/categories`, options).then(errorOrData);
}