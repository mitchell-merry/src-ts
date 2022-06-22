import { get, isError } from ".";
import { Leaderboard, LeaderboardLevelParams, LeaderboardLevelResponse, LeaderboardParams, LeaderboardResponse, SRCError } from "../types";

/** Get the User data from a username or id */
export async function getLeaderboard(game: string, category: string, options?: LeaderboardParams): Promise<Leaderboard | SRCError> {
	const res = await get<LeaderboardResponse>(`/leaderboards/${game}/category/${category}`, options);

	if(isError(res)) return res;

	return res.data;
}

export async function getLevelLeaderboard(game: string, level: string, category: string, options?: LeaderboardLevelParams): Promise<Leaderboard | SRCError> {
	const res = await get<LeaderboardLevelResponse>(`/leaderboards/${game}/level/${level}/${category}`, options);

	if(isError(res)) return res;

	return res.data;
}