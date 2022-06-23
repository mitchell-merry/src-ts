import { errorOrData, get } from '.';
import { SRCError, User, UserResponse } from '../types';

/** Get the User data from a username or id */
export async function getUser(username: string): Promise<User | SRCError> {
	return get<UserResponse>(`/users/${username}`).then(errorOrData);
}