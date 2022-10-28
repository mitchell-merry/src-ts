import { Paginated, PaginatedParams, SortParams } from "./util";
import { Genre } from "../resources";
import { Data } from "../other";

/** GET /genres https://github.com/speedruncomorg/api/blob/master/version1/genres.md#get-genres */
export type GenresResponse = Paginated<Genre>;
export type GenresParams = SortParams<"name"> & PaginatedParams;

/** GET /genres/{id} https://github.com/speedruncomorg/api/blob/master/version1/genres.md#get-genresid */
export type GenreResponse = Data<Genre>;