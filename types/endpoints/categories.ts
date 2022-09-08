import { Callback, Embed, Paginated, PaginatedParams, SortParams } from "./util";
import { Category, Leaderboard, Variable } from "../resources";
import { Data } from "../other";

/** GET /categories/{id} https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesid */
export type CategoryResponse<E extends string = ""> = Data<Category<E>>;
export type CategoryParams = Embed & Callback;

/** GET /categories/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesidvariables */
export type CategoryVariablesResponse = Data<Variable[]>;
export type CategoryVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos"> & Embed & Callback;

/** GET /categories/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesidrecords */
export type CategoryRecordsResponse<E extends string = ""> = Paginated<Leaderboard<E>>;
export type CategoryRecordsParams = {
	/** only return the top N places (this can result in more than N runs!); this is set to 3 by default */
	top?: number;
	/** when set to a true value, empty leaderboards will not show up in the result */
	"skip-empty"?: boolean;
} & Embed & PaginatedParams & Callback;