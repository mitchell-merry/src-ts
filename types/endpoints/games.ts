import { Callback, Embed, Paginated, PaginatedParams, SortParams } from "./util";
import { BulkGame, Category, Game, Leaderboard, Level, Variable } from "../resources";
import { Data } from "../other";

/** GET /games https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-games */
export type GamesResponse<E extends string = ""> = Paginated<Game<E>>;
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
export type GameResponse<E extends string = ""> = Data<Game<E>>;
export type GameParams<E extends string = ""> = Embed<E> & Callback;

/** GET /games/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidcategories */
export type GameCategoriesResponse<E extends string = ""> = Data<Category<E>[]>;
export type GameCategoriesParams = {
	/** when given, filters (out) misc categories */
	miscellaneous?: boolean;
} & Embed & SortParams<"name" | "miscellaneous" | "pos"> & Callback;

/** GET /games/{id}/levels https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidlevels */
export type GameLevelsResponse<E extends string = ""> = Data<Level<E>[]>;
export type GameLevelsParams = SortParams<"name" | "pos"> & Embed & Callback;

/** GET /games/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidvariables */
export type GameVariablesResponse = Data<Variable[]>;
export type GameVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos" > & Embed & Callback;

/** GET /games/{id}/derived-games https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidderived-games */
export type GameDerivedGamesResponse<E extends string = ""> = Paginated<Game<E>>;
export type GameDerivedGamesParams = Omit<GamesParams, 'romhack'> & PaginatedParams & Callback;

/** GET /games/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidrecords */
export type GameRecordsResponse<E extends string = ""> = Paginated<Leaderboard<E>>;
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