import { AdditionalEmbed, SubEmbeds } from "../embed";
import { Data, RelLink } from "../util";
import { Game } from "./Game";
import { Variable } from "./Variable";

/**
 * https://github.com/speedruncomorg/api/blob/master/version1/categories.md#structure
 * 
 * Categories are the different rulesets for speedruns.
 */
 export type Category<Embed extends string = "", CType = CategoryType> = {
	/** ID values can vary in length, and uniquely represent a category. */
	id: string;
	/** The name of the category. */
	name: string;
	/** The URL to the category leaderboard on speedrun.com. 
	 * 
	 * Note that for per-level categories, the `weblink` only points to the game page, because the link depends on the chosen level.
	 * However, when fetching categories in the context of a level (e.g. by requesting /api/v1/levels/<level id>/categories), the weblink will be set to the category leaderboard for that level.
	 */
	weblink: string;
	/** Either "per-game" (for full game categories) or "per-level" (for level categories). */
	type: CategoryType;
	/**  Freeform text with some basic, undocumented speedrun.com markup. */
	rules: string | null;
	/** The number of participants per run in this category. */
	players: {
		/** Type of restriction on the number of players for the category. */
		type: CategoryPlayerType;
		/** Associated limit for the restriction of players. */
		value: number;
	};
	/** Flags categories that are usually not shown directly on the leaderboards, but are otherwise nothing special. */
	miscellaneous: boolean;
	/** A set of associated resource links. */
	links: RelLink<"self" | "game" | "variables" | "records" | "runs" | "leaderboard">[];
}
& AdditionalEmbed<Embed, "game", { categories: Data<Game<SubEmbeds<Embed, "game">>[]> }>
& AdditionalEmbed<Embed, "variables", { variables: Data<Variable[]> }>;

/** Defines the type of a category, where "per-game" refers to full-game categories, and "per-level" refers to level categories. */
export type CategoryType = "per-game" | "per-level";
/** Defines restrictions on the number of players that can submit to a category for a single run. "exactly" defines an exact quantity, and "up-to" defines an upper limit. */
export type CategoryPlayerType = "exactly" | "up-to";