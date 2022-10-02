import { Leaderboard, LeaderboardParams, LeaderboardResponse } from "../../types";
import { get, GetOptions, shimData } from "../http";

/** This will return a full-game leaderboard. The game and category can be either IDs (e.g. xldev513) or the respective abbreviations.
 * 
 * GET /leaderboards/{game}/category/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamecategorycategory
 * 
 * @param game The game's ID or abbreviation.
 * @param category The category's ID or abbreviation.
 * @param variables A mapping of variable IDs to values to filter the runs on the leaderboard.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
 export async function getLeaderboard<Embed extends string = "">(game: string, category: string, variables: Record<string, string> = {}, queryParams?: LeaderboardParams, options?: GetOptions): Promise<Leaderboard<Embed>> {
	const varQueryParams = Object.fromEntries(Object.entries(variables).map(([variable, value]) => [`var-${variable}`, value]));
	return get<LeaderboardResponse<Embed>>(`/leaderboards/${game}/category/${category}`, { ...varQueryParams, ...queryParams }).then(shimData);
}

/** This will return a individual-level leaderboard. The same filtering options as with full-game leaderboards apply.
 * The game, category and level can be either IDs (e.g. xldev513) or their respective abbreviations.
 * 
 * GET /leaderboards/{game}/level/{level}/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamelevellevelcategory
 * 
 * @param game The game's ID or abbreviation.
 * @param level The level's ID or abbreviation.
 * @param category The category's ID or abbreviation.
 * @param variables A mapping of variable IDs to values to filter the runs on the leaderboard.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getLevelLeaderboard<Embed extends string = "">(game: string, level: string, category: string, variables: Record<string, string> = {}, queryParams?: LeaderboardParams, options?: GetOptions): Promise<Leaderboard<Embed>> {
	const varQueryParams = Object.fromEntries(Object.entries(variables).map(([variable, value]) => [`var-${variable}`, value]));
	return get<LeaderboardResponse<Embed>>(`/leaderboards/${game}/level/${level}/${category}`, { ...varQueryParams, ...queryParams }, options).then(shimData);
}