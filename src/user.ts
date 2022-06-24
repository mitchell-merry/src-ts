import { errorOrData, get } from '.';
import { UserResponse } from '../types';

/** Get a User. */
export async function getUser(user: string) {
	return get<UserResponse>(`/users/${user}`).then(errorOrData);
}