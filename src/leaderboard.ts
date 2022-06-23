import { errorOrData, get } from ".";
import { Leaderboard, LeaderboardLevelParams, LeaderboardLevelResponse, LeaderboardParams, LeaderboardResponse, SRCError } from "../types";

/** Build the name of a leaderboard from the name of the game, category, and if applicable, variables and levels. */
export function buildLeaderboardName(gameName: string, categoryName: string, variableNames: string[], levelName?: string) {
	let name = `${gameName}`;
	if(levelName) name += `: ${levelName}`;
	name += ` - ${categoryName}`;
	
	if(variableNames.length !== 0)
	{
		name += ` (${variableNames.join(', ')})`;
	}

	return name;
}

/** Get a full-game leaderboard. */
export async function getLeaderboard(game: string, category: string, options?: LeaderboardParams): Promise<Leaderboard | SRCError> {
	return get<LeaderboardResponse>(`/leaderboards/${game}/category/${category}`, options).then(errorOrData);
}

/** Get a level leaderboard. */
export async function getLevelLeaderboard(game: string, level: string, category: string, options?: LeaderboardLevelParams): Promise<Leaderboard | SRCError> {
	return get<LeaderboardLevelResponse>(`/leaderboards/${game}/level/${level}/${category}`, options).then(errorOrData);
}