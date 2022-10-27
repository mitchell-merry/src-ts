import { GuestRel, Leaderboard, Player, PlayerGuest, PlayerGuestPartial, PlayerGuestPartialURI, PlayerPartial, PlayerPartialUri, PlayerUser, PlayerUserPartial, PlayerUserPartialURI, Run, User, UserLocation, UserRel, Variable } from "../types";

/** Build the name of a leaderboard from the name of the game, category, and if applicable, variables and levels. */
export function buildLeaderboardName(gameName: string, categoryName: string, variableNames: string[] = [], levelName?: string) {
	let name = `${gameName}`;
	if(levelName) name += `: ${levelName}`;
	name += ` - ${categoryName}`;
	
	if(variableNames.length !== 0)
	{
		name += ` (${variableNames.join(', ')})`;
	}

	return name;
}

/** Filter a list of runs by variables, as key-value pairs. */
export function filterRuns<Embed extends string = "">(runs: Run<Embed>[], variables: Record<string, string> = {}) {
	return runs.filter(run => !Object.entries(variables).some(([variable, value]) => !(variable in run.values) || run.values[variable] !== value));
}

/** Type guard for checking if the given variable is a subcategory or not.
 * Note: Not sure if this guarantees .values.default to be not null.
 */
export function variableIsSubcategory (variable: Variable): variable is Variable & { 'is-subcategory': true } {
	return variable['is-subcategory'];
}

/** Type guard to determine if an object with a rel object is a User. */
export function playerIsUser<T extends UserRel | GuestRel>(player: T): player is Exclude<T, GuestRel> {
	return player.rel === 'user';
}

/** Type guard to determine if an object with a rel object is a Guest. */
export function playerIsGuest<T extends UserRel | GuestRel>(player: T): player is Exclude<T, UserRel> {
	return player.rel === 'guest';
}

/** Type guard to check if user.location is null or not. */
export function userLocationNotNull (user: User): user is User & { location: UserLocation } { 
	return user.location !== null; 
}


type PU = UserRel & {
	d: string;
}

type PG = GuestRel & {
	d: string;
}

type P = PU | PG;

// const a = {} as Player;

// // const d = playerIsUser(a);
// // if (d) {
// // 	a;
// // }
// const b = [a]
// const d = b.filter((p): p is PlayerUser => p.rel === "user");
// const e = b.filter(playerIsUser);
// const f = b.filter<PlayerUser>(playerIsUser);