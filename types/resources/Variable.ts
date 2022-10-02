import { RelLink } from "../other";

/**
 * https://github.com/speedruncomorg/api/blob/master/version1/variables.md
 * 
 * Variables are custom criteria to distinguish between [runs](https://github.com/speedruncomorg/api/blob/master/version1/runs.md) done in the same [category](https://github.com/speedruncomorg/api/blob/master/version1/categories.md) or [level](https://github.com/speedruncomorg/api/blob/master/version1/levels.md). The speed in Mario Kart games (which can be 50cc, 100cc or 150cc) is an example for a variable that has 3 possible values.
 * 
 * Variables are defined per-game and can be applicable to either all runs for this game or just full-game or individual-level (IL) runs. Variables can also be restricted to a category.
 */
export interface Variable {
	/** The id of the variable. */
	id: string;
	/** The name of the variable. This is shown on speedrun.com in the "Submit Run" form, and for filters only in the filter list. */
	name: string;
	/** Can be either `null` if the variable applies to all categories or the ID of the one category the variable applies to. */
	category: string | null;
	/** Scope of the variable. */
	scope: VariableScope;
	/** Whether or not newly submitted runs must include a value for this variable. */
	mandatory: boolean;
	/** Whether the user can give a custom value for the variable when submitting the run. This custom value is stored just like the predefined ones, so there is no different handling needed for these. */
	"user-defined": boolean;
	/** Whether or not the variable is taken into consideration when collecting runs for the leaderboard. */
	obsoletes: boolean;
	/** Contains the possible values for the variable and the default one. */
	values: VariableValues;
	/** Primarily a property that controls the user interface for selecting leaderboards on speedrun.com (the tabs vs a filter). Even if a variable is displayed as a sub-category, you still need a regular category to define a leaderboard. But you can take this as a hint on how this values should be handled */
	"is-subcategory": boolean;
	links: RelLink<"self" | "game" | "category">[];
}

export interface VariableScopeSingleLevel {
	/** * When type is `single-level`, the variable is for one specific level only. In this case, `scope` contains a `level` element, containing the ID of that level. */
	type: "single-level";
	/** The id of the level this variable applies to. */
	level: string;
}

export interface VariableScopeGeneral {
	/** * When `type` is `global`, the variable applies to all kinds of run (full game, IL, whatever).
	 *  * When `type` is `full-game`, the variable is only for full game runs, so it doesn't apply to IL runs.
	 *  * When `type` is `all-levels`, the variable is only for IL runs and not for full game runs.
	 */
	type: "global" | "full-game" | "all-levels";
}

export type VariableScope = VariableScopeGeneral | VariableScopeSingleLevel;

export interface VariableValue {
	/** The name of the value. */
	label: string;
	/** Only set for subcategories. The rules for the variable. */
	rules: string | null;
	/** Only set for subcategories. The flags for the variable. */
	flags: {
		/** Whether or not this value is considered miscellaneous. Can be null. */
		miscellaneous: boolean | null;
	}
}

export interface VariableValues {
	/** The defined values for the variable. */
	values: Record<string, VariableValue>;
	/** The value ID to be used as a default. This field can be null if there is no default. */
	default: string | null;
}