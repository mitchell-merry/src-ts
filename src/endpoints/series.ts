import { Series, SeriesResponse, SeriesParams, SeriesAllParams, SeriesAllResponse, SeriesGamesParams, SeriesGamesResponse, Game } from "../../types";
import { get, GetOptions, paginatedGet, PaginatedGetOptions, shimData } from "../http";

/** This will return a page of series', with the pagination data.
 * 
 * GET /series https://github.com/speedruncomorg/api/blob/master/version1/seriess.md#get-seriess
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getSeriesPage<Embed extends string = "">(queryParams?: SeriesAllParams<Embed>, options?: GetOptions): Promise<SeriesAllResponse<Embed>> {
	return get<SeriesAllResponse<Embed>>(`/series`, queryParams, options);
}

/** This will return all series'.
 * 
 * GET /series https://github.com/speedruncomorg/api/blob/master/version1/seriess.md#get-seriess
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getAllSeries<Embed extends string = "", S = Series<Embed>>(queryParams?: SeriesAllParams<Embed>, options?: PaginatedGetOptions<Series<Embed>, S>): Promise<NonNullable<Awaited<S>>[]> {
	return paginatedGet<SeriesAllResponse<Embed>, S>(`/series`, queryParams, options);
}

/** This will retrieve a single series, identified by its ID.
 * 
 * GET /series/{id} https://github.com/speedruncomorg/api/blob/master/version1/seriess.md#get-seriessid
 * 
 * @param series The series's ID.
 * @param options Options for the HTTP request itself.
 */
export async function getSeries<Embed extends string = "">(series: string, queryParams?: SeriesParams<Embed>, options?: GetOptions): Promise<Series<Embed>> {
	return get<SeriesResponse<Embed>>(`/series/${series}`, queryParams, options).then(shimData);
}

/** This will retrieve the first page of games of a given series (the ID can be either the actual series ID or its abbreviation).
 *  You can filter the result by the same attributes as you can filter the [complete game list](https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-games).
 * 
 *  You can also use the sorting options as for the complete game list.
 * 
 *  As with the complete game list, bulk mode is available on this resource as well.
 *  
 *  GET /series/{id}/games https://github.com/speedruncomorg/api/blob/master/version1/series.md#get-seriesidgames
 */
export async function getSeriesGames<Embed extends string = "">(series: string, queryParams?: SeriesGamesParams<Embed>, options?: GetOptions): Promise<SeriesGamesResponse<Embed>> {
	return get<SeriesGamesResponse<Embed>>(`/series/${series}/games`, queryParams, options);
}

/** This will retrieve all games of a given series (the ID can be either the actual series ID or its abbreviation).
 *  You can filter the result by the same attributes as you can filter the [complete game list](https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-games).
 * 
 *  You can also use the sorting options as for the complete game list.
 * 
 *  As with the complete game list, bulk mode is available on this resource as well.
 *  
 *  GET /series/{id}/games https://github.com/speedruncomorg/api/blob/master/version1/series.md#get-seriesidgames
 */
export async function getAllSeriesGames<Embed extends string = "", S = Game<Embed>>(series: string, queryParams?: SeriesGamesParams<Embed>, options?: PaginatedGetOptions<Game<Embed>, S>): Promise<NonNullable<Awaited<S>>[]> {
	return paginatedGet<SeriesGamesResponse<Embed>, S>(`/series/${series}/games`, queryParams, options);
}