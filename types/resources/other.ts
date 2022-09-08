import { Embeddable } from "../embed";
import { Assets, Data, ModeratorType, Names, RelLink } from "../other";
import { User } from "./User";

export interface Series<Embed extends string = ""> {
	id: string;
	names: Names;
	abbreviation: string;
	weblink: string;
	moderators: Embeddable<Embed, "moderators", Record<string, ModeratorType>, Data<User[]>>;
	created: string | null;
	assets: Assets;
	links: RelLink<"self" | "games">[];
}

export interface GameType {
	id: string;
	name: string;
	"allows-base-game": boolean;
	links: RelLink<"self" | "games">[];
}

export interface Platform {
	id: string;
	name: string;
	released: number;
	links: RelLink<"self" | "games" | "runs">[];
}

export interface Region {
	id: string;
	name: string;
	links: RelLink<"self" | "games" | "runs">[];
}

export interface Genre {
	id: string;
	name: string;
	links: RelLink<"self" | "games">[];
}

export interface Engine {
	id: string;
	name: string;
	links: RelLink<"self" | "games">[];
}

export interface Developer {
	id: string;
	name: string;
	links: RelLink<"self" | "games">[];
}

export interface Publisher {
	id: string;
	name: string;
	links: RelLink<"self" | "games">[];
}