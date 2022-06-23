import { errorOrData, get } from '.';
import { Category, SRCError, Game, GameCategoriesResponse, GameParams, GameResponse, GameCategoriesParams } from '../types';

/** Get a Game. */
export async function getGame(game: string, options?: GameParams): Promise<Game | SRCError> {
	return get<GameResponse>(`/games/${game}`, options).then(errorOrData);
}

/** Get all categories that belong to a game. Does not filter by category type. */
export async function getGameCategories(game: string, options?: GameCategoriesParams): Promise<Category[] | SRCError> {
	return get<GameCategoriesResponse>(`/games/${game}/categories`, options).then(errorOrData);
}