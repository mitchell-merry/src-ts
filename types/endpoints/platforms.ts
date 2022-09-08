import { Callback, Paginated, PaginatedParams, SortParams } from "./util";
import { Platform } from "../resources";
import { Data } from "../other";

/** GET /platforms https://github.com/speedruncomorg/api/blob/master/version1/platforms.md#get-platforms */
export type PlatformsResponse = Paginated<Platform>;
export type PlatformsParams = SortParams<"name" | "released"> & PaginatedParams & Callback;

/** GET /platforms/{id} https://github.com/speedruncomorg/api/blob/master/version1/platforms.md#get-platformsid */
export type PlatformResponse = Data<Platform>;