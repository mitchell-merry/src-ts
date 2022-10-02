export type Data<T> = { data: T }
export type Link = { uri: string; };

export type RelLink<rel> = Link & {
	/** The relation this link has to the parent */
	rel: rel;
}

export interface Asset { uri: string; }
export interface NullableAsset { uri: string | null; }

/** The assets for a game / series. */
export interface Assets {
	/** The logo for `speedrun.com` in the game's / series' style. The regular `speedrun.com` logo if one is not set. */
	logo: Asset;
	/** The cover of the game. Speedrun.com's blank `?` cover if not set. */
	"cover-tiny": Asset;
	/** The cover of the game. Speedrun.com's blank `?` cover if not set. */
	"cover-small": Asset;
	/** The cover of the game. Speedrun.com's blank `?` cover if not set. */
	"cover-medium": Asset;
	/** The cover of the game. Speedrun.com's blank `?` cover if not set. */
	"cover-large": Asset;
	/** The small icon for the game. Used on speedrun.com in a user's info page, showing which games they moderate / follow. The speedrun.com 1st place trophy if not set. */
	"icon": Asset;
	/** The custom 1st place trophy for a game. The default speedrun.com trophy if not set. */
	"trophy-1st": Asset;
	/** The custom 2nd place trophy for a game. The default speedrun.com trophy if not set. */
	"trophy-2nd": Asset;
	/** The custom 3rd place trophy for a game. The default speedrun.com trophy if not set. */
	"trophy-3rd": Asset;
	/** The custom 1st place trophy for a game. Null if not set. */
	"trophy-4th": Asset | null;
	/** The background asset of the game's page. Null if not set. */
	"background": Asset | null;
	/** The foreground asset of the game's page. Null if not set. */
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