import { errorOrData, get } from '.';
import { SRCError, User, UserResponse } from '../types';

/** Get a User. */
export async function getUser(user: string): Promise<User | SRCError> {
	return get<UserResponse>(`/users/${user}`).then(errorOrData);
}