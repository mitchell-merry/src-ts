import { Category, CategoryType, Embed, Game, GuestRel, Leaderboard, LeaderboardPartial, Player, PlayerGuest, PlayerGuestPartial, PlayerGuestPartialURI, PlayerPartial, PlayerPartialUri, PlayerUser, PlayerUserPartial, PlayerUserPartialURI, Run, User, UserLocation, UserRel, Variable } from "../types";

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

export function buildLeaderboardNameFromPartial(game: Game<"categories.variables,levels">, board: LeaderboardPartial): string {
	const level = game.levels.data.find(l => l.id === board.level);
	const category = game.categories.data.find(c => c.id === board.category);
	if (!category || (!!level !== !!board.level))
		throw new Error(`One of \`category\` (${board.category}) or \`level\` (${board.level}) could not be found.`);
	
	const variableNames = Object.entries(board.variables).map(([vId, vVal]): string => {
		const variable = category.variables.data.find(v => v.id === vId);
		if (!variable) throw new Error(`Invalid variable given: ${vId}.`);

		const value = Object.entries(variable.values.values).find(([valueId, _]) => valueId === vVal);
		if (!value) throw new Error(`Invalid value given: ${vVal}`);
		
		const [ _, name ] = value;
		return name.label
	});

	return buildLeaderboardName(game.names.international, category.name, variableNames, level?.name);
}

/** True if the run matches the variable/values provided, false otherwise. */
export function runMatchesVariables<Embed extends string = "">(run: Run<Embed>, variables: Record<string, string> = {}) {
    return !Object.entries(variables).some(([variable, value]) => !(variable in run.values) || run.values[variable] !== value);
}

/** Filter a list of runs by variables, as key-value pairs. */
export function filterRuns<Embed extends string = "">(runs: Run<Embed>[], variables: Record<string, string> = {}) {
	return runs.filter(r => runMatchesVariables(r, variables));
}

/** Filters a list of categories by type. */
export function filterCategoriesByType<Embed extends string, CT extends CategoryType>(categories: Category<Embed, CategoryType>[], type: CT): Category<Embed, CT>[] {
	return categories.filter((c): c is Category<Embed, CT> => c.type === type);
}

/** Filters a list of variables only for those applicable to the `level` and `category` (or full-game only, if `level` is not provided.) */
export function filterApplicableVariables(variables: Variable[], category: string, level?: string) {
	return variables.filter(v => {
		if (v.category !== null && v.category !== category)
			return false;

		if (v.scope.type === "global")
			return true;
	
		if (v.scope.type === "full-game" && level === undefined)
			return true;

		if (v.scope.type === "all-levels" && level !== undefined)
			return true;
		
		if (v.scope.type === "single-level" && v.scope.level === level)
			return true;
		
		return false;
	});
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