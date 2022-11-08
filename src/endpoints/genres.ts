import { Genre, GenreResponse, GenresParams, GenresResponse } from "../../types";
import { get, GetOptions, paginatedGet, PaginatedGetOptions, shimData } from "../http";

/** This will return a page of genres, with the pagination data.
 * 
 * GET /genres https://github.com/speedruncomorg/api/blob/master/version1/genres.md#get-genres
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getGenres(queryParams?: GenresParams, options?: GetOptions): Promise<GenresResponse> {
	return get<GenresResponse>(`/genres`, queryParams, options);
}

/** This will return all genres.
 * 
 * GET /genres https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-genres
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getAllGenres<S = Genre>(queryParams?: GenresParams, options?: PaginatedGetOptions<Genre, S>) {
	return paginatedGet<GenresResponse, S>(`/genres`, queryParams, options);
}

/** This will retrieve a single genre, identified by its ID.
 * 
 * GET /genres/{id} https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-genresid
 * 
 * @param genre The genre's ID.
 * @param options Options for the HTTP request itself.
 */
export async function getGenre(genre: string, options?: GetOptions): Promise<Genre> {
	return get<GenreResponse>(`/genres/${genre}`, {}, options).then(shimData);
}
