import { LeaderboardParams, LeaderboardResponse } from "../../types";
import { get, shimData } from "../http";

/** This will return a full-game leaderboard. The game and category can be either IDs (e.g. xldev513) or the respective abbreviations.
 * 
 * GET /leaderboards/{game}/category/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamecategorycategory
 * 
 * @param game The game's ID or abbreviation.
 * @param category The category's ID or abbreviation.
 * @param queryParams Optional query paramters to pass to the GET request.
 */
 export async function getLeaderboard<Embed extends string = "">(game: string, category: string, queryParams?: LeaderboardParams) {
	return get<LeaderboardResponse<Embed>>(`/leaderboards/${game}/category/${category}`, queryParams).then(shimData);
}

/** This will return a individual-level leaderboard. The same filtering options as with full-game leaderboards apply.
 * The game, category and level can be either IDs (e.g. xldev513) or their respective abbreviations.
 * 
 * GET /leaderboards/{game}/level/{level}/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamelevellevelcategory
 * 
 * @param game The game's ID or abbreviation.
 * @param level The level's ID or abbreviation.
 * @param category The category's ID or abbreviation.
 * @param queryParams Optional query paramters to pass to the GET request.
 */
export async function getLevelLeaderboard<Embed extends string = "">(game: string, level: string, category: string, queryParams?: LeaderboardParams) {
	return get<LeaderboardResponse<Embed>>(`/leaderboards/${game}/level/${level}/${category}`, queryParams).then(shimData);
}