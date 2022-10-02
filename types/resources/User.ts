import { Asset, Link, Names, NullableAsset, RelLink } from "../other";

/**
 * https://github.com/speedruncomorg/api/blob/master/version1/users.md
 * 
 * Users are the individuals who have registered an account on speedrun.com. Users submit (their) [runs](https://github.com/speedruncomorg/api/blob/master/version1/runs.md) and moderate [games](https://github.com/speedruncomorg/api/blob/master/version1/games.md), besides other things that are not covered by this API (like writing posts in the forums).
 */
export interface User {
	/** The id of the user */
	id: string;
	/** Names that the user has - some users have a japanese name. */
	names: Names;
	/** Whether or not the user has the colour scrolling animation on their name. */
	supporterAnimation: boolean;
	/** The pronouns that the user has set on the site. */
	pronouns: UserPronouns;
	/** The link to the user's profile on speedrun.com */
	weblink: string;
	/** The name-style determines how the username is shown on the website and can be one of two things:
	 * 
	 * * When style is `solid`, there is one color.
     * * When style is `gradient`, there are two colors that form a linear gradient. The two colors are named `color-from` and `color-to`.
	 * 
	 * Each color consists of two values. The `light` one is to be used on light backgrounds, the `dark` one is for darker background colors. Choose whatever your app's design needs.
	 */
	"name-style": NameStyle;
	/** The role of the user on speedrun.com. */
	role: UserRole;
	/** An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) encoded datetime for when the user signed up. Can be null for old user accounts. */
	signup: string | null;
	/** The user's location, if set. (null if not) */
	location: UserLocation | null;
	/** A link to the user's set twitch account. Null if none set. */
	twitch: Link | null;
	/** A link to the user's set hitbox account. Null if none set. */
	hitbox: Link | null;
	/** A link to the user's set youtube account. Null if none set. */
	youtube: Link | null;
	/** A link to the user's set twitter account. Null if none set. */
	twitter: Link | null;
	/** A link to the user's set speedrunslive account. Null if none set. */
	speedrunslive: Link | null;
	/** URIs to the user's assets. */
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
	/** For countries, an [ISO Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. For regions, something custom by speedrun.com. */
	code: string;
	/** International and japanese name of the location. Not all locations have a japanese name set. */
	names: Names;
}

export interface UserLocation {
	/** Always set if a location is set. */
	country: Location;
	/** Not available for all countries and therefore not always set. */
	region?: Location;
}

export interface UserAssets {
	/** Icon that appears next to a user's name. */
	icon: NullableAsset;
	/** The supporter icon of the user, if they are a supporter. */
	supporterIcon: Asset | null;
	/** User's profile picture. */
	image: NullableAsset; 
}

export interface Color {
	/** The version of the colour that should be used in light themes. */
	light: string;
	/** The version of the colour that should be used in dark themes. */
	dark: string;
}

export interface NameStyleSolid {
	/** `solid` means one colour for the name. */
	style: "solid";
	/** The singular colour for the name. */
	color: Color;
}

export interface NameStyleGradient {
	/** `gradient` means two colours form a linear gradient. */
	style: "gradient";
	/** The colour on the left/start of the name on speedrun.com. */
	"color-from": Color;
	/** The colour on the right/end of the name on speedrun.com. */
	"color-to": Color;
}

export type NameStyle = NameStyleSolid | NameStyleGradient;

export interface Guest {
	/** The name of the guest. */
	name: string;
	links: RelLink<"self" | "runs">[];
}