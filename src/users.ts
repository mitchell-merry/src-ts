import { errorOrData, get } from '.';
import { Player, User, UserLocation, UserResponse } from '../types';

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
export async function getUser(user: string) {
	return get<UserResponse>(`/users/${user}`).then(errorOrData);
}

/** Type guard to determine if a Player object is embedded from a Leaderboard resource. */
export function playerIsUser (player: Player): player is User & { rel: "user" } {
	return 'id' in player;
}

/** Type guard to check if user.location is null or not. */
export function userLocationNotNull (user: User): user is User & { location: UserLocation } { 
	return user.location !== null; 
}