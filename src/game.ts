import { get, isError } from '.';
import { Category, SRCError, Game, GameCategoriesResponse, GameParams, GameResponse, GameCategoriesParams } from '../types';

export async function getGame(game_id: string, options?: GameParams): Promise<Game | SRCError> {
	const res = await get<GameResponse>(`/games/${game_id}`, options);

	if(isError(res)) return res;

	return res.data;
}

export async function getGameCategories(game_id: string, options?: GameCategoriesParams): Promise<Category[] | SRCError> {
	const res = await get<GameCategoriesResponse>(`/games/${game_id}/categories`, options);

	if(isError(res)) return res;

	return res.data;
}