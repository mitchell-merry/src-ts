import { Callback, Embed, Paginated, PaginatedParams, SortParams } from "./util";
import { Category, Leaderboard, Level, Variable } from "../resources";
import { Data } from "../other";

/** GET /levels/{id} https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsid */
export type LevelResponse<E extends string = ""> = Data<Level<E>>;
export type LevelParams = Embed & Callback;

/** GET /levels/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidcategories */
export type LevelCategoriesResponse<E extends string = ""> = Data<Category<E>[]>;
export type LevelCategoriesParams = {
	/** when given, filters (out) misc categories */
	miscellaneous?: boolean;
} & SortParams<"name" | "miscellaneous" | "pos"> & Embed & Callback;

/** GET /levels/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidvariables */
export type LevelVariablesResponse = Data<Variable[]>
export type LevelVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos"> & Embed & Callback;

/** GET /levels/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidrecords */
export type LevelLeaderboardResponse<E extends string = ""> = Paginated<Leaderboard<E>>;
export type LevelLeaderboardParams = {
	/** only return the top N places (this can result in more than N runs!); this is set to 3 by default */
	top?: number;
	/** when set to a true value, empty leaderboards will not show up in the result */
	"skip-empty"?: boolean;
} & Embed & PaginatedParams & Callback;
