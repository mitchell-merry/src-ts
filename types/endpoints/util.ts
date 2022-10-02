import { RelLink } from "../other";

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
	/** Embed resources into the response - https://github.com/speedruncomorg/api/blob/master/version1/embedding.md 
	 * 
	 * (TypeScript): Make sure to specify the "Embed" parameter on resources that can embed as well to get the correct type! (Available on types and all function endpoints).
	 * 
	 * Example:
	 * 
	 * ```ts
	 * const game = SRC.getGame<"categories">("wys", { embed: "categories" });
	 * // Type: Game<"categories">
	 * game.categories; // available
	 * ```
	*/
	embed?: string;
}

export interface ResponseError {
	/** The HTTP status code of the response. */
	status: number;
	/** The provided message for why the error occured. */
	message: string;
	links: [ RelLink<"support">, RelLink<"report-issues"> ];
}

export interface Callback {
	/** Retrieve the response as JavaScript instead of JSON (for example, do `?callback=foo` to get the data as a `foo({....})` function call) */
	callback?: boolean;
}

