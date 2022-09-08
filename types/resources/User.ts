import { Asset, Link, Names, NullableAsset, RelLink } from "../other";

export interface User {
	id: string;
	names: Names;
	supporterAnimation: boolean;
	pronouns: UserPronouns;
	weblink: string;
	"name-style": NameStyle;
	role: UserRole;
	signup: string | null;
	location: UserLocation | null;
	twitch: Link | null;
	hitbox: Link | null;
	youtube: Link | null;
	twitter: Link | null;
	speedrunslive: Link | null;
	assets: UserAssets;
	links: RelLink<"self" | "runs" | "games" | "personal-bests">[];
}

export type Profile = Omit<User, 'links'> & RelLink<"self" | "runs" | "games" | "personal-bests" | "user">[];

export type UserRole = "banned" | "user" | "trusted" | "moderator" | "admin" | "programmer";
export type Pronouns = "He/Him" | "She/Her" | "They/Them" | "It/Its" | "Any/All";

export type UserPronouns = "" | null | Pronouns
					| `${Pronouns},${Pronouns}`
					| `${Pronouns},${Pronouns},${Pronouns}`
					| `${Pronouns},${Pronouns},${Pronouns},${Pronouns}`
					| `${Pronouns},${Pronouns},${Pronouns},${Pronouns},${Pronouns}`;

export interface Location {
	code: string;
	names: Names;
}

export interface UserLocation {
	country: Location;
	region?: Location;
}

export interface UserAssets {
	icon: NullableAsset;
	supporterIcon: Asset | null;
	image: NullableAsset; 
}

export interface Color {
	light: string;
	dark: string;
}

export interface NameStyleSolid {
	style: "solid";
	color: Color;
}

export interface NameStyleGradient {
	style: "gradient";
	"color-to": Color;
	"color-from": Color;
}

export type NameStyle = NameStyleSolid | NameStyleGradient;

export interface Guest {
	name: string;
	links: RelLink<"self" | "runs">[];
}