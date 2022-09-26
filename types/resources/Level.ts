import { AdditionalEmbed, SubEmbeds } from "../embed";
import { Data, RelLink } from "../other";
import { Category } from "./Category";
import { Variable } from "./Variable";

export type Level<Embed extends string = ""> = {
	/** The id of the level. */
	id: string;
	/** The name of the level. */
	name: string;
	/** The link to the level leaderboard on speedrun.com */
	weblink: string;
	/** The rules for the level on speedrun.com */
	rules: string | null;
	links: RelLink<"self" | "game" | "categories" | "variables" | "records" | "runs" | "leaderboard">[];
} 
// TODO WORKAROUND TO FIX EMBED TYPE HINTS
& { id: string }
& AdditionalEmbed<Embed, "categories", { categories: Data<Category<SubEmbeds<Embed, "categories">, "per-level">[]> }>
& AdditionalEmbed<Embed, "variables", { variables: Data<Variable[]> }>;
