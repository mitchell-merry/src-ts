import { errorOrData, get } from '.';
import { Player, User, UserLocation, UserResponse } from '../types';

/** Get a User object by their ID. */
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