import { Paginated, PaginatedParams, SortParams } from "./util";
import { GameType } from "../resources";
import { Data } from "../other";


/** GET /gametypes https://github.com/speedruncomorg/api/blob/master/version1/gametypes.md#get-gametypes */
export type GameTypesResponse = Paginated<GameType>;
export type GameTypesParams = SortParams<"name"> & PaginatedParams;

/** GET /gametypes/{id} https://github.com/speedruncomorg/api/blob/master/version1/gametypes.md#get-gametypesid */
export type GameTypeResponse = Data<GameType>;