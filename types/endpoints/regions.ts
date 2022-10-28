import { Paginated, PaginatedParams, SortParams } from "./util";
import { Region } from "../resources";
import { Data } from "../other";

/** GET /regions https://github.com/speedruncomorg/api/blob/master/version1/regions.md#get-regions */
export type RegionsResponse = Paginated<Region>;
export type RegionsParams = SortParams<"name"> & PaginatedParams;

/** GET /regions/{id} https://github.com/speedruncomorg/api/blob/master/version1/regions.md#get-regionsid */
export type RegionResponse = Data<Region>;