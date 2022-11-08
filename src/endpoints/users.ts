import { RankedRun, User, UserPersonalBestsParams, UserPersonalBestsResponse, UserResponse, UsersParams, UsersResponse } from "../../types";
import { get, GetOptions, paginatedGet, PaginatedGetOptions, shimData } from "../http";

/** This will return a page of users, with the pagination data.
 * 
 * This query returns a 400 response unless you provide filters.
 * 
 * GET /users  https://github.com/speedruncomorg/api/blob/master/version1/users.md#get-users
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getUsers(queryParams?: UsersParams, options?: GetOptions): Promise<UsersResponse> {
	return get<UsersResponse>(`/users`, queryParams, options);
}

/** This will return a list of users.
 * 
 * This query returns a 400 response unless you provide filters.
 * 
 * GET /users  https://github.com/speedruncomorg/api/blob/master/version1/users.md#get-users
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getAllUsers<S = User>(queryParams?: UsersParams, options?: PaginatedGetOptions<User, S>): Promise<NonNullable<Awaited<S>>[]> {
	return paginatedGet<UsersResponse, S>(`/users`, queryParams, options);
}

/** This will retrieve a single user, identified by their ID. Instead of the ID, the username can be used as well
 * (but this is only recommended for quick lookups, as usernames can change over time), so GET /users/Pac is possible
 * and will redirect to /users/wzx7q875.
 * 
 * There are no parameters/options on this endpoint.
 * 
 * GET /users/{id} https://github.com/speedruncomorg/api/blob/master/version1/users.md#get-usersid
 * 
 * @param user The ID or username of the respective user.
 */
export async function getUser(user: string, options?: GetOptions): Promise<User> {
	return get<UserResponse>(`/users/${user}`, {}, options).then(shimData);
}

/** This will retrieve a list of runs, representing the Personal Bests of the given user. This will not include obsolete runs. If you want those as well,
 * use `getRuns` and filter by user.
 * 
 * @param user The ID or username of the respective user.
 * @param queryParams Optional query paramters to pass to the GET request.
 * @param options Options for the HTTP request itself.
 */
export async function getUserPersonalBests<Embed extends string = "">(user: string, queryParams?: UserPersonalBestsParams<Embed>, options?: GetOptions): Promise<RankedRun<Embed>[]> {
	return get<UserPersonalBestsResponse<Embed>>(`/users/${user}/personal-bests`, queryParams, options).then(shimData);
}