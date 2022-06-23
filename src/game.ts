import { errorOrData, get } from '.';
import { Category, SRCError, Game, GameCategoriesResponse, GameParams, GameResponse, GameCategoriesParams } from '../types';

export async function getGame(game_id: string, options?: GameParams): Promise<Game | SRCError> {
	return get<GameResponse>(`/games/${game_id}`, options).then(errorOrData);
}

export async function getGameCategories(game_id: string, options?: GameCategoriesParams): Promise<Category[] | SRCError> {
	return get<GameCategoriesResponse>(`/games/${game_id}/categories`, options).then(errorOrData);
}