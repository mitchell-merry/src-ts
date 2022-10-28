import { Embed, Paginated, PaginatedParams, SortParams } from "./util";
import { Category, Leaderboard, Level, Variable } from "../resources";
import { Data } from "../other";

/** GET /levels/{id} https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsid */
export type LevelResponse<E extends string = ""> = Data<Level<E>>;
export type LevelParams<E extends string = ""> = Embed<E>;

/** GET /levels/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidcategories */
export type LevelCategoriesResponse<E extends string = ""> = Data<Category<E, "per-level">[]>;
export type LevelCategoriesParams<E extends string = ""> = {
	/** when given, filters (out) misc categories */
	miscellaneous?: boolean;
} & SortParams<"name" | "miscellaneous" | "pos"> & Embed<E>;

/** GET /levels/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidvariables */
export type LevelVariablesResponse = Data<Variable[]>
export type LevelVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos">;

/** GET /levels/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidrecords */
export type LevelRecordsResponse<E extends string = ""> = Paginated<Leaderboard<E>>;
export type LevelRecordsParams<E extends string = ""> = {
	/** only return the top N places (this can result in more than N runs!); this is set to 3 by default */
	top?: number;
	/** when set to a true value, empty leaderboards will not show up in the result */
	"skip-empty"?: boolean;
} & Embed<E> & PaginatedParams;

/** @deprecated Use {@linkcode LevelRecordsResponse} instead */
export type LevelLeaderboardResponse<E extends string = ""> = LevelRecordsResponse<E>;
/** @deprecated Use {@linkcode LevelRecordsParams} instead */
export type LevelLeaderboardParams<E extends string = ""> = LevelRecordsParams<E>;