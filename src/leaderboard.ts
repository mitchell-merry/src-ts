import { errorOrData, get } from ".";
import { Leaderboard, LeaderboardLevelParams, LeaderboardLevelResponse, LeaderboardParams, LeaderboardResponse, SRCError } from "../types";

/** Get the User data from a username or id */
export async function getLeaderboard(game: string, category: string, options?: LeaderboardParams): Promise<Leaderboard | SRCError> {
	return get<LeaderboardResponse>(`/leaderboards/${game}/category/${category}`, options).then(errorOrData);
}

export async function getLevelLeaderboard(game: string, level: string, category: string, options?: LeaderboardLevelParams): Promise<Leaderboard | SRCError> {
	return get<LeaderboardLevelResponse>(`/leaderboards/${game}/level/${level}/${category}`, options).then(errorOrData);
}