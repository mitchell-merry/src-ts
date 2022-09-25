import { User, UserResponse, UsersParams, UsersResponse } from "../../types";
import { get, paginatedGet, shimData } from "../http";

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
 export async function getUser(user: string): Promise<User> {
	return get<UserResponse>(`/users/${user}`).then(shimData);
}

/** This will return a page of users, with the pagination data.
 * 
 * This query returns a 400 response unless you provide filters.
 * 
 * GET /users  https://github.com/speedruncomorg/api/blob/master/version1/users.md#get-users
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 */
 export async function getUsers(queryParams?: UsersParams): Promise<UsersResponse> {
	return get<UsersResponse>(`/users`, queryParams);
}

/** This will return a list of users.
 * 
 * This query returns a 400 response unless you provide filters.
 * 
 * GET /users  https://github.com/speedruncomorg/api/blob/master/version1/users.md#get-users
 * 
 * @param queryParams Optional query paramters to pass to the GET request.
 */
export async function getAllUsers(queryParams?: UsersParams): Promise<User[]> {
	return paginatedGet<UsersResponse>(`/users`, queryParams);
}