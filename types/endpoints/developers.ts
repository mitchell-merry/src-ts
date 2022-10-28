import { Paginated, PaginatedParams, SortParams } from "./util";
import { Developer } from "../resources";
import { Data } from "../other";

/** GET /developers https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-developers */
export type DevelopersResponse = Paginated<Developer>;
export type DevelopersParams = SortParams<"name"> & PaginatedParams;

/** GET /developers/{id} https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-developersid */
export type DeveloperResponse = Data<Developer>;