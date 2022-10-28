import { Embed } from "./util";
import { Leaderboard } from "../resources";
import { Data } from "../other";

/** **Full-game**: GET /leaderboards/{game}/category/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamecategorycategory
 * 
 * **Levels**: GET /leaderboards/{game}/level/{level}/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamelevellevelcategory
 */
 export type LeaderboardResponse<E extends string = ""> = Data<Leaderboard<E>>;
 /** To filter by custom variables, name the query string parameter var-[variable ID here] and use the value ID as the value (for example, 'var-m5ly6jn4': 'p12z471x'). */
 export type LeaderboardParams<E extends string = ""> = {
	 /** only return the top N places (this can result in more than N runs!) */
	 top?: number;
	 /** platform ID; when given, only returns runs done on that particular platform */
	 platform?: string;
	 /** region ID; when given, only returns runs done in that particular region */
	 region?: string;
	 /** when not given, real devices and emulators are shown. When set to a true value, only emulators are shown, else only real devices are shown */
	 emulators?: boolean;
	 /** `false` by default; when set to a true value, only runs with a video will be returned */
	 "video-only"?: boolean;
	 /** controls the sorting; can be one of realtime, realtime_noloads or ingame */
	 timing?: string;
	 /** [ISO 8601 date string](https://en.wikipedia.org/wiki/ISO_8601#Dates); when given, only returns runs done before or on this date */
	 date?: string;
 } & Record<`var-${string}`, string> & Embed<E>;
 
 /** GET /leaderboards/{game}/level/{level}/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamelevellevelcategory 
 * @deprecated Use LeaderboardResponse instead. They are the same type.
 */
 export type LeaderboardLevelResponse<E extends string = ""> = Data<Leaderboard<E>>;
 /** @deprecated Use LeaderboardParams instead. They are the same type. */
 export type LeaderboardLevelParams<E extends string = ""> = LeaderboardParams<E>;