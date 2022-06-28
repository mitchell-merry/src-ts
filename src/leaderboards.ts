import { errorOrData, get } from ".";
import { LeaderboardParams, LeaderboardResponse } from "../types";

/** This will return a full-game leaderboard. The game and category can be either IDs (e.g. xldev513) or the respective abbreviations.
 * 
 * GET /leaderboards/{game}/category/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamecategorycategory
 * 
 * @param game The game's ID or abbreviation.
 * @param category The category's ID or abbreviation.
 * @param options Optional query paramters to pass to the GET request.
 */
export async function getLeaderboard(game: string, category: string, options?: LeaderboardParams) {
	return get<LeaderboardResponse>(`/leaderboards/${game}/category/${category}`, options).then(errorOrData);
}

/** This will return a individual-level leaderboard. The same filtering options as with full-game leaderboards apply.
 * The game, category and level can be either IDs (e.g. xldev513) or their respective abbreviations.
 * 
 * GET /leaderboards/{game}/level/{level}/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamelevellevelcategory
 * 
 * @param game The game's ID or abbreviation.
 * @param category The category's ID or abbreviation.
 * @param options Optional query paramters to pass to the GET request.
 */
export async function getLevelLeaderboard(game: string, level: string, category: string, options?: LeaderboardParams) {
	return get<LeaderboardResponse>(`/leaderboards/${game}/level/${level}/${category}`, options).then(errorOrData);
}

/** Build the name of a leaderboard from the name of the game, category, and if applicable, variables and levels. */
export function buildLeaderboardName(gameName: string, categoryName: string, variableNames: string[] = [], levelName?: string) {
	let name = `${gameName}`;
	if(levelName) name += `: ${levelName}`;
	name += ` - ${categoryName}`;
	
	if(variableNames.length !== 0)
	{
		name += ` (${variableNames.join(', ')})`;
	}

	return name;
}