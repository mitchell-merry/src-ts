import { Paginated, PaginatedParams, SortParams } from "./util";
import { Engine } from "../resources";
import { Data } from "../other";

/** GET /engines https://github.com/speedruncomorg/api/blob/master/version1/engines.md#get-engines */
export type EnginesResponse = Paginated<Engine>;
export type EnginesParams = SortParams<"name"> & PaginatedParams;    

/** GET /engines/{id} https://github.com/speedruncomorg/api/blob/master/version1/engines.md#get-enginesid */
export type EngineResponse = Data<Engine>;