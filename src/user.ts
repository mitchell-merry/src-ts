import { get, isError } from '.';
import { SRCError, User, UserResponse } from '../types';

/** Get the User data from a username or id */
export async function getUser(username: string): Promise<User | SRCError> {
	const res = await get<UserResponse>(`/users/${username}`);

	if(isError(res)) return res;

	return res.data;
}