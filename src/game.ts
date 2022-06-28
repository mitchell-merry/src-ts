import { errorOrData, get } from '.';
import { GameCategoriesResponse, GameParams, GameResponse, GameCategoriesParams, GameLevelsParams, GameLevelsResponse } from '../types';

/** Get a Game. */
export async function getGame(game: string, options?: GameParams) {
	return get<GameResponse>(`/games/${game}`, options).then(errorOrData);
}

/** Get all categories that belong to a game. Does not filter by category type. */
export async function getGameCategories(game: string, options?: GameCategoriesParams) {
	return get<GameCategoriesResponse>(`/games/${game}/categories`, options).then(errorOrData);
}

/** Get all levels that belong to a game. */
export async function getGameLevels(game: string, options?: GameLevelsParams) {
	return get<GameLevelsResponse>(`/games/${game}/levels`, options);
}