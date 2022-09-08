import { AdditionalEmbed, SubEmbeds } from "../embed";
import { Data, RelLink } from "../util";
import { Category } from "./Category";
import { Variable } from "./Variable";

export type Level<Embed extends string = ""> = {
	id: string;
	name: string;
	weblink: string;
	rules: string | null;
	links: RelLink<"self" | "game" | "categories" | "variables" | "records" | "runs" | "leaderboard">[];
} 
& AdditionalEmbed<Embed, "categories", { categories: Data<Category<SubEmbeds<Embed, "categories">, "per-level">[]> }>
& AdditionalEmbed<Embed, "variables", { variables: Data<Variable[]> }>;
