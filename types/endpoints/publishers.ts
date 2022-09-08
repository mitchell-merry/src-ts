import { Callback, Paginated, PaginatedParams, SortParams } from "./util";
import { Publisher } from "../resources";
import { Data } from "../util";

/** GET /publishers https://github.com/speedruncomorg/api/blob/master/version1/publishers.md#get-publishers */
export type PublishersResponse = Paginated<Publisher>;
export type PublishsersParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /publishers/{id} https://github.com/speedruncomorg/api/blob/master/version1/publishers.md#get-publishersid */
export type PublisherResponse = Data<Publisher>;