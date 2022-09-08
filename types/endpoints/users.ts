import { Callback, Embed, Paginated, PaginatedParams, SortParams } from "./util";
import { RankedRun, User } from "../resources";
import { Data } from "../util";

/** GET /users - This query returns a 400 response unless you provide filters. https://github.com/speedruncomorg/api/blob/master/version1/users.md#get-users */
export type UsersResponse = Paginated<User>;
export type UsersParams = {
	/** when given, searches the value (case-insensitive exact-string match) across user names, URLs and social profiles; all other query string filters are disabled when this is given */
	lookup?: string;
	/** only returns users whose name/URL contains the given value; the comparision is case-insensitive */
	name?: string;
	/** searches for Twitch usernames */
	twitch?: string;
	/** searches for Hitbox usernames */
	hitbox?: string;
	/** searches for Twitter usernames */
	twitter?: string;
	/** searches for SpeedRunsLive usernames */
	speedrunslive?: string;
} & SortParams<"name.int" | "name.jap" | "signup" | "role"> & Embed & PaginatedParams & Callback;

/** GET /users/{id} https://github.com/speedruncomorg/api/blob/master/version1/users.md#get-usersid */
export type UserResponse = Data<User>;
/** GET /users/{id}/personal-bests https://github.com/speedruncomorg/api/blob/master/version1/users.md#get-usersidpersonal-bests */
export type UserPersonalBestsResponse = Data<RankedRun[]>;
export type UserPersonalBestsParams = {
	/** when given, only PBs with a place equal or better than this value (e.g. top=1 returns all World Records of the given user) */
	top?: number;
	/** when given, restricts the result to games and romhacks in that series; can be either a series ID or abbreviation */
	series?: string;
	/** when given, restricts the result to that game; can be either a game ID or abbreviation */
	game?: string;
} & Embed & Callback;