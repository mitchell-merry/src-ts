import { BulkGame, Category, Data, Developer, Engine, Game, GameType, Genre, Guest, Leaderboard, Level, Notification, Platform, Profile, Publisher, RankedRun, Region, RelLink, Run, SendGuest, SendUser, Series, User, Variable } from "./src-api";

/** https://github.com/speedruncomorg/api/blob/master/version1/pagination.md */
export interface Pagination {
	/** offset used in response */
	offset: number;
	/** max used in response */
	max: number;
	/** actual number of elements returned */
	size: number;
	/** links to previous and next page, with current max and offset */
	links: RelLink<"next" | "prev">[]
}

/** wrapper for paginated resources https://github.com/speedruncomorg/api/blob/master/version1/pagination.md */
export interface Paginated<T> {
	/** data of the repsonse */
	data: T[];
	/** pagination information - https://github.com/speedruncomorg/api/blob/master/version1/pagination.md */
	pagination: Pagination;
}

/** Unwraps the Paginated type, i.e. PaginatedData<Paginated<T>> = T */
export type PaginatedData<T extends Paginated<any>> = T extends Paginated<infer S> ? S : never;

/** https://github.com/speedruncomorg/api/blob/master/version1/pagination.md */
export interface PaginatedParams {
	/** offset to start getting elements from - defaults to 0 and is independent of max */
	offset?: number;
	/** Maximum number of elements to return, 1-200. */
	max?: number;
}

/** https://github.com/speedruncomorg/api/blob/master/version1/pagination.md */
export interface SortParams<orderby> {
	/** direction to sort the results in - asc is ascending, desc is descending */
	direction?: "asc" | "desc";
	/** the criteria with which to sort by */
	orderby?: orderby;
}

// I'd really like to make this more complex for each possible
// comma-separated list of embeds. Unfortunately, there are 11 options
// for Game and thus I can't support it.
export interface Embed {
	/** embed resources into the response - https://github.com/speedruncomorg/api/blob/master/version1/embedding.md */
	embed?: string;
}

export interface SRCError {
	status: number;
	message: string;
	links: [ RelLink<"support">, RelLink<"report-issues"> ];
}

export interface Callback {
	/** retrieve the response as JavaScript instead of JSON (for example, do ?callback=foo to get the data as a foo({....}) function call) */
	callback?: boolean;
}

/** GET /categories/{id} https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesid */
export type CategoryResponse = Data<Category>;
export type CategoryParams = Embed & Callback;

/** GET /categories/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesidvariables */
export type CategoryVariablesResponse = Data<Variable[]>;
export type CategoryVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos"> & Embed & Callback;

/** GET /categories/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesidrecords */
export type CategoryRecordsResponse = Paginated<Leaderboard>;
export type CategoryRecordsParams = {
	/** only return the top N places (this can result in more than N runs!); this is set to 3 by default */
	top?: number;
	/** when set to a true value, empty leaderboards will not show up in the result */
	"skip-empty"?: boolean;
} & Embed & PaginatedParams & Callback;

/** GET /developers https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-developers */
export type DevelopersResponse = Paginated<Developer>;
export type DevelopersParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /developers/{id} https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-developersid */
export type DeveloperResponse = Data<Developer>;

/** GET /engines https://github.com/speedruncomorg/api/blob/master/version1/engines.md#get-engines */
export type EnginesResponse = Paginated<Engine>;
export type EnginesParams = SortParams<"name"> & PaginatedParams & Callback;    

/** GET /engines/{id} https://github.com/speedruncomorg/api/blob/master/version1/engines.md#get-enginesid */
export type EngineResponse = Data<Engine>;

/** GET /games https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-games */
export type GamesResponse = Paginated<Game>;
export type GamesFilter = {
	/** when given, performs a fuzzy search across game names and abbreviations */
	name?: string;
	/** when given, performs an exact-match search for this abbreviation */
	abbreviation?: string;
	/** when given, restricts to games released in that year */
	released?: number;
	/** game type ID; when given, restricts to that game type */
	gametype?: string;
	/** platform ID; when given, restricts to that platform */
	platform?: string;
	/** region ID; when given, restricts to that region */
	region?: string;
	/** genre ID; when given, restricts to that genre */
	genre?: string;
	/** engine ID; when given, restricts to that engine */
	engine?: string;
	/**	developer ID; when given, restricts to that developer */
	developer?: string;
	/** publisher ID; when given, restricts to that publisher */
	publisher?: string;
	/** moderator ID; when given, only games moderated by that user will be returned */
	moderator?: string;
	/** @deprecated legacy parameter, do not use this in new code; whether or not to include games with game types (if this parameter is not set, game types are included; if it is set to a true value, only games with game types will be returned, otherwise only games without game types are returned) */
	romhack?: boolean;
	/** enable bulk access */
	_bulk?: false;
}
export type GamesParams = GamesFilter & Embed & SortParams<"name.int" | "name.jap" | "abbreviation" | "released" | "created" | "similarity"> & PaginatedParams & Callback;

/** GET /games?_bulk=yes https://github.com/speedruncomorg/api/blob/master/version1/games.md#bulk-access */
export type BulkGamesResponse = Paginated<BulkGame>;
export type BulkGamesParams = Omit<GamesParams, "_bulk" | "embed"> & { 
	/** enable bulk access */
	_bulk: true; // bulk mode must be enabled
}

/** GET /games/{id} https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesid */
export type GameResponse = Data<Game>;
export type GameParams = Embed & Callback;

/** GET /games/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidcategories */
export type GameCategoriesResponse = Data<Category[]>;
export type GameCategoriesParams = {
	/** when given, filters (out) misc categories */
	miscellaneous?: boolean;
} & Embed & SortParams<"name" | "miscellaneous" | "pos"> & Callback;

/** GET /games/{id}/levels https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidlevels */
export type GameLevelsResponse = Data<Level[]>;
export type GameLevelsParams = SortParams<"name" | "pos"> & Embed & Callback;

/** GET /games/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidvariables */
export type GameVariablesResponse = Data<Variable[]>;
export type GameVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos" > & Embed & Callback;

/** GET /games/{id}/derived-games https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidderived-games */
export type GameDerivedGamesResponse = Paginated<Game>;
export type GameDerivedGamesParams = GameParams & { romhack: undefined; } & PaginatedParams & Callback;

/** GET /games/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidrecords */
export type GameRecordsResponse =  Paginated<Leaderboard>;
export type GameRecordsParams = {
	/** only return the top N places (this can result in more than N runs!); this is set to 3 by default */
	top?: number;
	/**  	when set to full-game, only full-game categories will be included; when set to levels, only individual levels are returned; default is all */
	scope?: string;
	/** when set to a false value, miscellaneous categories will not be included */
	miscellaneous?: boolean;
	/** when set to a true value, empty leaderboards will not show up in the result */
	"skip-empty"?: boolean;
} & Embed & PaginatedParams & Callback;

/** GET /gametypes https://github.com/speedruncomorg/api/blob/master/version1/gametypes.md#get-gametypes */
export type GameTypesResponse = Paginated<GameType>;
export type GameTypesParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /gametypes/{id} https://github.com/speedruncomorg/api/blob/master/version1/gametypes.md#get-gametypesid */
export type GameTypeResponse = Data<GameType>;

/** GET /genres https://github.com/speedruncomorg/api/blob/master/version1/genres.md#get-genres */
export type GenresResponse = Paginated<Genre>;
export type GenresParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /genres/{id} https://github.com/speedruncomorg/api/blob/master/version1/genres.md#get-genresid */
export type GenreResponse = Data<Genre>;

/** GET /guests/{name} https://github.com/speedruncomorg/api/blob/master/version1/guests.md#get-guestsname */
export type GuestResponse = Data<Guest>;

/** **Full-game**: GET /leaderboards/{game}/category/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamecategorycategory
 * 
 * **Levels**: GET /leaderboards/{game}/level/{level}/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamelevellevelcategory
 */
export type LeaderboardResponse = Data<Leaderboard>;
/** To filter by custom variables, name the query string parameter var-[variable ID here] and use the value ID as the value (for example, 'var-m5ly6jn4': 'p12z471x'). */
export type LeaderboardParams = {
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
} & Record<`var-${string}`, string> & Embed & Callback;

/** GET /leaderboards/{game}/level/{level}/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamelevellevelcategory 
* @deprecated Use LeaderboardResponse instead. They are the same type.
*/
export type LeaderboardLevelResponse = Data<Leaderboard>;
/** @deprecated Use LeaderboardParams instead. They are the same type. */
export type LeaderboardLevelParams = LeaderboardParams;

/** GET /levels/{id} https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsid */
export type LevelResponse = Data<Level>;
export type LevelParams = Embed & Callback;

/** GET /levels/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidcategories */
export type LevelCategoriesResponse = Data<Category[]>;
export type LevelCategoriesParams = {
	/** when given, filters (out) misc categories */
	miscellaneous?: boolean;
} & SortParams<"name" | "miscellaneous" | "pos"> & Embed & Callback;

/** GET /levels/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidvariables */
export type LevelVariablesResponse = Data<Variable[]>
export type LevelVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos"> & Embed & Callback;

/** GET /levels/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidrecords */
export type LevelLeaderboardResponse = Paginated<Leaderboard>;
export type LevelLeaderboardParams = {
	/** only return the top N places (this can result in more than N runs!); this is set to 3 by default */
	top?: number;
	/** when set to a true value, empty leaderboards will not show up in the result */
	"skip-empty"?: boolean;
} & Embed & PaginatedParams & Callback;

/** GET /notifications https://github.com/speedruncomorg/api/blob/master/version1/notifications.md#get-notifications */
export type NotificationsResponse = Data<Notification[]>;
export type NotificationsParams = SortParams<"created"> & Callback;

/** GET /platforms https://github.com/speedruncomorg/api/blob/master/version1/platforms.md#get-platforms */
export type PlatformsResponse = Paginated<Platform>;
export type PlatformsParams = SortParams<"name" | "released"> & PaginatedParams & Callback;

/** GET /platforms/{id} https://github.com/speedruncomorg/api/blob/master/version1/platforms.md#get-platformsid */
export type PlatformResponse = Data<Platform>;

/** GET /profile https://github.com/speedruncomorg/api/blob/master/version1/profile.md#get-profile */
export type ProfileResponse = Data<Profile>;

/** GET /publishers https://github.com/speedruncomorg/api/blob/master/version1/publishers.md#get-publishers */
export type PublishersResponse = Paginated<Publisher>;
export type PublishsersParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /publishers/{id} https://github.com/speedruncomorg/api/blob/master/version1/publishers.md#get-publishersid */
export type PublisherResponse = Data<Publisher>;

/** GET /regions https://github.com/speedruncomorg/api/blob/master/version1/regions.md#get-regions */
export type RegionsResponse = Paginated<Region>;
export type RegionsParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /regions/{id} https://github.com/speedruncomorg/api/blob/master/version1/regions.md#get-regionsid */
export type RegionResponse = Data<Region>;

/** GET /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runs */
export type RunsResponse = Paginated<Run>;
export type RunsParams = {
	/** user ID; when given, only returns runs played by that user */
	user?: string;
	/** when given, only returns runs done by that guest */
	guest?: string;
	/** user ID; when given, only returns runs examined by that user */
	examiner?: string;
	/** game ID; when given, restricts to that game */
	game?: string;
	/** level ID; when given, restricts to that level */
	level?: string;
	/** category ID; when given, restricts to that category */
	category?: string;
	/** platform ID; when given, restricts to that platform */
	platform?: string;
	/** region ID; when given, restricts to that region */
	region?: string;
	/** whether only games run on emulator will be returned */
	emulated?: boolean | "yes" | 1;
	/** filters by run status */
	status?: "new" | "verified" | "rejected";
} & SortParams<"game" | "category" | "level" | "platform" | "region" | "emulated" | "date" | "submitted" | "status" | "verify-date"> & Embed & PaginatedParams & Callback;

/** GET /runs/{id} https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runsid */
export type RunResponse = Data<Run>;
export type RunParams = Embed & Callback;

/** https://github.com/speedruncomorg/api/blob/master/version1/runs.md#post-runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#post-runs */
export type PostRunResponse = Data<Run> | (
	SRCError & { 
		/** a list of problems */
		errors: string[];
	}
);

export type PutRunStatus = {
	status: {
		status: "verified";
	} | {
		status: "rejected";
		reason: string;
	};
};

export type PutRunPlayers = {
	players: (SendUser | SendGuest)[];
};
/** PUT /runs/{id}/players https://github.com/speedruncomorg/api/blob/master/version1/runs.md#put-runsidplayers */
export type PutRunPlayersResponse = Data<Run>;

/** DELETE /runs/{id} https://github.com/speedruncomorg/api/blob/master/version1/runs.md#delete-runsid */
export type DeleteRunResponse = Data<Run>;

/** GET /series https://github.com/speedruncomorg/api/blob/master/version1/series.md#get-series */
export type SeriesAllResponse = Paginated<Series>;
export type SeriesAllParams = {
	/** when given, performs a fuzzy search across series names and abbreviations */
	name?: string;
	/** when given, performs an exact-match search for this abbreviation */
	abbreviation?: string;
	/** moderator ID; when given, only series moderated by that user will be returned */
	moderator?: string;
} & SortParams<"name.int" | "name.jap" | "abbreviation" | "created"> & Embed & PaginatedParams & Callback;

/** GET /series/{id} https://github.com/speedruncomorg/api/blob/master/version1/series.md#get-seriesid */
export type SeriesResponse = Data<Series>;
export type SeriesParams = Embed & Callback;

/** GET /series/{id}/games https://github.com/speedruncomorg/api/blob/master/version1/series.md#get-seriesidgames */
export type SeriesGamesResponse = Paginated<Game>;
export type SeriesGamesParams = GamesParams & PaginatedParams & Callback;

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

/** GET /variables/{id} https://github.com/speedruncomorg/api/blob/master/version1/variables.md#get-variablesid */
export type VariableResponse = Data<Variable>;