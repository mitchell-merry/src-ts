import { Embed, Paginated, PaginatedParams, SortParams } from "./util";
import { Game, Series } from "../resources";
import { Data } from "../other";
import { GamesParams } from "./games";

/** GET /series https://github.com/speedruncomorg/api/blob/master/version1/series.md#get-series */
export type SeriesAllResponse<E extends string = ""> = Paginated<Series<E>>;
export type SeriesAllParams<E extends string = ""> = {
	/** when given, performs a fuzzy search across series names and abbreviations */
	name?: string;
	/** when given, performs an exact-match search for this abbreviation */
	abbreviation?: string;
	/** moderator ID; when given, only series moderated by that user will be returned */
	moderator?: string;
} & SortParams<"name.int" | "name.jap" | "abbreviation" | "created"> & Embed<E> & PaginatedParams;

/** GET /series/{id} https://github.com/speedruncomorg/api/blob/master/version1/series.md#get-seriesid */
export type SeriesResponse<E extends string = ""> = Data<Series<E>>;
export type SeriesParams<E extends string = ""> = Embed<E>;

/** GET /series/{id}/games https://github.com/speedruncomorg/api/blob/master/version1/series.md#get-seriesidgames */
export type SeriesGamesResponse<E extends string = ""> = Paginated<Game<E>>;
export type SeriesGamesParams<E extends string = ""> = GamesParams<E>;