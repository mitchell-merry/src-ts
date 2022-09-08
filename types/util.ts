export type Data<T> = { data: T }
export type Link = { uri: string; };

export type RelLink<rel> = Link & {
	/** The relation this link has to the parent */
	rel: rel;
}

export interface Asset { uri: string; }
export interface NullableAsset { uri: string | null; }

export interface Assets {
	logo: Asset;
	"cover-tiny": Asset;
	"cover-small": Asset;
	"cover-medium": Asset;
	"cover-large": Asset;
	"icon": Asset;
	"trophy-1st": Asset;
	"trophy-2nd": Asset;
	"trophy-3rd": Asset;
	"trophy-4th": Asset | null;
	"background": Asset | null;
	"foreground": Asset | null;
}

export interface Names {
	/** International name. */
	international: string;
	/** Japanese name, if applicable. Null if not. */
	japanese: string | null;
}

/** Possible values for the type of moderator a user is.
 * 
 * "verifier" should realistically be an option, but they are set as "super-moderator"s.
 */
 export type ModeratorType = "super-moderator" | "moderator"; 