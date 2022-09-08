import { Callback, Paginated, PaginatedParams, SortParams } from "./util";
import { GameType } from "../resources";
import { Data } from "../util";


/** GET /gametypes https://github.com/speedruncomorg/api/blob/master/version1/gametypes.md#get-gametypes */
export type GameTypesResponse = Paginated<GameType>;
export type GameTypesParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /gametypes/{id} https://github.com/speedruncomorg/api/blob/master/version1/gametypes.md#get-gametypesid */
export type GameTypeResponse = Data<GameType>;