import { Publisher, PublisherResponse, PublishersParams, PublishersResponse } from "../../types";
import { get, GetOptions, paginatedGet, PaginatedGetOptions, shimData } from "../http";

/** This will return a page of publishers, with the pagination data.
 * 
 * GET /publishers https://github.com/speedruncomorg/api/blob/master/version1/publishers.md#get-publishers
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getPublishers(queryParams?: PublishersParams, options?: GetOptions): Promise<PublishersResponse> {
	return get<PublishersResponse>(`/publishers`, queryParams, options);
}

/** This will return all publishers.
 * 
 * GET /publishers https://github.com/speedruncomorg/api/blob/master/version1/publishers.md#get-publishers
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getAllPublishers<S = Publisher>(queryParams?: PublishersParams, options?: PaginatedGetOptions<Publisher, S>): Promise<NonNullable<Awaited<S>>[]> {
	return paginatedGet<PublishersResponse, S>(`/publishers`, queryParams, options);
}

/** This will retrieve a single publisher, identified by its ID.
 * 
 * GET /publishers/{id} https://github.com/speedruncomorg/api/blob/master/version1/publishers.md#get-publishersid
 * 
 * @param publisher The publisher's ID.
 * @param options Options for the HTTP request itself.
 */
export async function getPublisher(publisher: string, options?: GetOptions): Promise<Publisher> {
	return get<PublisherResponse>(`/publishers/${publisher}`, {}, options).then(shimData);
}
