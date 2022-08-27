/** Wrapper for a pattern in the src API where response objects are contained within a "data" property. */
export type Data<T> = { data: T; };

export interface RelLink<rel> {
	/** The relation this link has to the parent */
	rel: rel;
	/** The link. */
	uri: string;
}

export interface Names {
	/** International name. */
	international: string;
	/** Japanese name, if applicable. Null if not. */
	japanese: string | null;
}

export interface Asset {
	/** The URI to the desired asset. */
	uri: string;
}

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

/** Defines the type of a category, where "per-game" refers to full-game categories, and "per-level" refers to level categories. */
export type CategoryType = "per-game" | "per-level";
/** Defines restrictions on the number of players that can submit to a category for a single run. "exactly" defines an exact quantity, and "up-to" defines an upper limit. */
export type CategoryPlayerType = "exactly" | "up-to";

/**
 * https://github.com/speedruncomorg/api/blob/master/version1/categories.md#structure
 * 
 * Categories are the different rulesets for speedruns.
 */
export interface Category {
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

	/** The game the category belongs to. (if embedded). */
	game?: Data<Game>;
	/** The applicable variables for this category. (if embedded). */
	variables?: Data<Variable[]>;
}

export interface GameNames {
	/** International name for the game. */
	international: string;
	/** Japanese name for the game. If none are set, null. */
	japanese: string | null;
	/** Twitch name for the game. If none are set, empty string. */
	twitch: string;
}

export type GameRulesetRunTime = "realtime" | "realtime_noloads" | "ingame";

/**
 * Flags defining certain rules of a game.
 */
export interface GameRuleset {
	/** If milliseconds are shown on the leaderboard. */
	"show-milliseconds": boolean;
	/** If the game requires moderators to verify a submission before it appears on the leaderboard. */
	"require-verification": boolean;
	/** If video is required in a submission. */
	"require-video": boolean;
	/** A list of times that can/should be given for any run of that game.  */
	"run-times": GameRulesetRunTime[];
	/** Determines the primary timing method for the game (one of the options in `run-times`). */
	"default-time": GameRulesetRunTime;
	/** If emulator submissions are allowed. */
	"emulators-allowed": boolean;
}

/** Possible values for the type of moderator a user is.
 * 
 * "verifier" should realistically be an option, but they are set as "super-moderator"s.
 */
export type ModeratorType = "super-moderator" | "moderator"; 

/**
 * A mapping of user IDs to ModeratorType. "data" is not allowed as a key to allow for narrowing.
 */
export type Moderators = Omit<Record<string, ModeratorType>, 'data'>;

export type EmbeddableModerators = Moderators | Data<User[]>;

/**
 * https://github.com/speedruncomorg/api/blob/master/version1/games.md#structure
 * 
 * Games are the things users do speedruns in. 
 * 
 * Games are associated with regions (US, Europe, ...), platforms (consoles, handhelds, ...), genres, engines, developers, game types, publishers, categories, levels and custom variables (like speed=50/100/150cc in Mario Kart games).
 * 
 * Games that are not part of a series are categorized in the "N/A" series for backwards compatibility.
 */
export interface Game {
	/** ID values can vary in length, and uniquely represent a game. */
	id: string;
	/** Assigned names for the game. */
	names: GameNames;
	/** The total number of boosts this game has received. "Boosts" on the game's page. */
	boostReceived: number;
	/** The number of users who have boosted the game. "Boosters" on the game's page. */
	boostDistinctDonors: number;
	/** Abbreviation of the game name. For example, Super Mario Sunshine = sms. */
	abbreviation: string;
	/** The URL to the game on speedrun.com. */
	weblink: string;
	/** Invite link to the community's discord server. Empty string for games without a discord link set. */
	discord: string;
	/** The year the game was released.
	 * 
	 * @deprecated superceded by release-date
	*/
	released: number;
	/** An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) encoded datetime representing when the game was released. */
	"release-date": string;
	/** Contains extra flags for the game's ruleset. */
	ruleset: GameRuleset;
	/** @deprecated superceded by `gametypes`. */
	romhack: boolean;
	/** 
	 * A list of game types IDs set for the game. This list can be empty.
	 * 
	 * Alternatively embeds all assigned gametypes.
	 */
	gametypes: string[] | Data<GameType[]>;
	/** 
	 * A list of platform IDs the game can be played on. This list can be empty.
	 * 
	 * Alternatively embeds all assigned regions. 
	 */
	platforms: string[] | Data<Platform[]>;
	/** 
	 * A list of region IDs the game is available in. This list can be empty.
	 * 
	 * Alternatively embeds all assigned regions. 
	 */
	regions: string[] | Data<Region[]>;
	/** 
	 * A list of genre IDs set for the game. This list can be empty.
	 * 
	 * Alternatively embeds all assigned genres.
	 */
	genres: string[] | Data<Genre[]>;
	/** 
	 * A list of engine IDs set for the game. This list can be empty.
	 * 
	 * Alternatively embeds all assigned engines.
	 */
	engines: string[] | Data<Engine[]>;
	/**
	 * A list of developer IDs set for the game. This list can be empty.
	 * 
	 * Alternative embeds all assigned developers.
	 */
	developers: string[] | Data<Developer[]>;
	/**
	 * A list of publisher IDs set for the game. This list can be empty.
	 * 
	 * Alternatively embeds the assigned publishers. 
	 */
	publishers: string[] | Data<Publisher[]>;
	/**
	 * A mapping of user IDs to their roles within the game. 
	 * Possible roles are moderator and super-moderator (super moderators can appoint other users as moderators).
	 * 
	 * Note that the API will falsely flag the role for verifiers as `super-moderator`. Be careful with trusting this value.
	 * 
	 * Alternatively embeds the users as full user resources.
	 */
	moderators: EmbeddableModerators;
	/** 
	 * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) encoded datetime representing when the game was added to speedrun.com.
	 * 
	 * Can be null for games that have been added in the early days of speedrun.com.
	 */
	created: string | null;
	/** Links to images that are used for the game on speedrun.com */
	assets: Assets;
	/**
	 * 
	 * `base-game` is only returned for games that have a base game set.
	 * 
	 * `romhacks` is a legacy value. New code should use derived-games instead.
	 * 
	 * `series` can appear multiple times, as games can be in multiple series.
	 */
	links: RelLink<"self" | "runs" | "levels" | "categories" | "variables" | "records" | "series" | "base-game" | "derived-games" | "romhacks" | "leaderboard">[];

	/** all levels defined for the game (if embedded) */
	levels?: Data<Level[]>;
	/** all defined categories for the game (if embedded) */
	categories?: Data<Category[]>;
	/** all defined variables for the game (if embedded) */
	variables?: Data<Variable[]>;
}

export interface BulkGame {
	/** The id of the game */
	id: string;
	/** The names of the game */
	names: Names;
	/** The abbreviation of the game */
	abbreviation: string;
	/** Link to the game's page on speedrun.com */
	weblink: string;
}

export interface RankedRun {
	/** The place this run has on the related leaderbord. */
	place: number;
	/** The run object */
	run: Omit<Run, 'players' | 'links'> & { players: RunPlayer[] };
}

export interface Leaderboard {
	/** A link to the leaderboard on speedrun.com */
	weblink: string;
	/** The id of the game the leaderboard belongs to.
	 * 
	 * Alternatively, the Data<Game> resource when embedded.
	 * 
	 * Data<never[]>: https://github.com/speedruncomorg/api/issues/118
	 */
	game: string | Data<Game> | Data<never[]>;
	/** The id of the category the leaderboard belongs to.
	 * 
	 * Alternatively, the Data<Category> resource when embedded.
	 * 
	 * Data<never[]>: https://github.com/speedruncomorg/api/issues/118
	 */
	category: string | Data<Category> | Data<never[]>;
	/** The id of the level the leaderboard belongs to (null if full game).
	 * 
	 * Alternatively, the Data<Level> resource when embedded.
	 * 
	 * Data<never[]>: https://github.com/speedruncomorg/api/issues/118
	 */
	level: string | null | Data<Level> | Data<never[]>;
	/** platform ID, when set. `null` otherwise */
	platform: string | null;
	/** region ID, when set. `null` otherwise */
	region: string | null;
	emulators: boolean | null;
	"video-only": boolean;
	timing: GameRulesetRunTime;
	/** A mapping between variable ID and value ID applicable to this leaderbord. */
	values: Record<string, string>;
	/** A list of runs on the leaderboard. */
	runs: RankedRun[];
	/** Related links to other resources. */
	links: RelLink<"game" | "category" | "level">[];

	/** If `players` is embedded, a flat list of all players of all runs on the leaderboard. */
	players?: Data<User[]>;
	/** If `regions` is embedded, a list of all used regions. */
	regions?: Data<Region[]>;
	/** If `platforms` is embedded, a list of all used platforms. */
	platforms?: Data<Platform[]>;
	/** If `variables` is embedded, a list of all applicable variables for the chosen level/category. */
	variables?: Data<Variable[]>;
}

export type Link = { uri: string; };

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

export type UserRole = "banned" | "user" | "trusted" | "moderator" | "admin" | "programmer";

export interface Location {
	code: string;
	names: Names;
}

export interface UserLocation {
	country: Location;
	region?: Location;
}

export type Pronouns = "He/Him" | "She/Her" | "They/Them";
export type UserPronouns = "" | null | Pronouns
					| `${Pronouns},${Pronouns}`
					| `${Pronouns},${Pronouns},${Pronouns}`;

export type NullableAsset = {
	uri: string | null;
}

export interface UserAssets {
	icon: NullableAsset;
	supporterIcon: Asset | null;
	image: NullableAsset; 
}

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

export type Profile = User;

export interface Guest {
	name: string;
	links: RelLink<"self" | "runs">[];
}

export type Player = (User & { rel: "user"; }) | (Guest & { rel: "guest"; });

export interface Level {
	id: string;
	name: string;
	weblink: string;
	rules: string | null;
	links: RelLink<"self" | "game" | "categories" | "variables" | "records" | "runs" | "leaderboard">[];

	categories?: Data<Category[]>;
	variables?: Data<Variable[]>;
}

export interface VariableScopeSingleLevel {
	type: "single-level";
	level: string;
}

export interface VariableScopeGeneral {
	type: "global" | "full-game" | "all-levels";
}

export type VariableScope = VariableScopeSingleLevel | VariableScopeGeneral;

export interface VariableValue {
	label: string;
	rules: string | null;
	flags: {
		miscellaneous: boolean | null;
	}
}

export interface VariableValues {
	values: Record<string, VariableValue>;
	default: string | null;
}

export interface Variable {
	id: string;
	name: string;
	category: string | null;
	scope: VariableScope;
	mandatory: boolean;
	"user-defined": boolean;
	obsoletes: boolean;
	values: VariableValues;
	"is-subcategory": boolean;
	links: RelLink<"self" | "game" | "category">[];
}

export interface RunVideos {
	links: { uri: string; }[];
}

export interface RunStatusVerified {
	status: "verified";
	examiner: string;
	"verify-date": string | null;
}

export interface RunStatusNew {
	status: "new";
}

export interface RunStatusRejected {
	status: "rejected";
	examiner: string;
	reason: string;
}

export type RunStatus = RunStatusVerified | RunStatusNew | RunStatusRejected;

export interface RunPlayerUser {
	rel: "user";
	id: string;
	uri: string;
}

export interface RunPlayerGuest {
	rel: "guest";
	name: string;
	uri: string;
}

export type RunPlayer = RunPlayerUser | RunPlayerGuest;

export type RealTime = {
	/** The `realtime` in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) form. */
	realtime: string;
	/** The `realtime` as a number of seconds. */
	realtime_t: number;
} | {
	/** The `realtime` in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) form. */
	realtime: null;
	/** The `realtime` as a number of seconds. */
	realtime_t: 0;
};

export type RealTimeNoLoads = {
	/** The `realtime_noloads` time in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) form. */
	realtime_noloads: string;
	/** The `realtime_noloads` time as a number of seconds. */
	realtime_noloads_t: number;
} | {
	/** The `realtime_noloads` time in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) form. */
	realtime_noloads: null;
	/** The `realtime_noloads` time as a number of seconds. */
	realtime_noloads_t: 0;
};

export type InGameTime = {
	/** The `ingame` time in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) form. */
	ingame: string;
	/** The `ingame` time as a number of seconds. */
	ingame_t: number;
} | {
	/** The `ingame` time in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) form. */
	ingame: null;
	/** The `ingame` time as a number of seconds. */
	ingame_t: 0;
};

export type RunTimes = {
	/** The `primary` time in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) form. */
	primary: string;
	/** The `primary` time as a number of seconds. */
	primary_t: number;
} & RealTime & RealTimeNoLoads & InGameTime;

export interface RunSystem {
	/** The id of the platform played. */
	platform: string | null;
	/** Whether the run was played using an emulator (true) or on console (false). */
	emulated: boolean;
	/** The region the run was played on. */
	region: string | null;
}

export interface Splits {
	/** The hosting site for the splits. Currently only supports splits.io, but may support more in the future. */
	rel: "splits.io";
	/** The splits resource. */
	uri: string;
}

export interface Run {
	/** ID values can vary in length, and uniquely represent a run. */
	id: string;
	/** The weblink of the run on speedrun.com.  */
	weblink: string;
	/** The id of the game the run belongs to.
	 * 
	 * Alternatively, when embedded, the Game resource.
	 */
	game: string | Data<Game> | Data<never[]>;
	/** The id of the level the run belongs to. (null if full-game)
	 * 
	 * Alternatively, when embedded, the Level resource.
	 */
	level: string | null | Data<Level> | Data<never[]>;
	/** The id of the category the run belongs to.
	 * 
	 * Alternatively, when embedded, the Category resource.
	 */
	category: string | Data<Category> | Data<never[]>;
	/** Contains information about all video links that have been provided for the run.
	 *  This includes the primary video (most runs only have one video, some have none
	 * 		at all) and all videos mentioned in the `comment`s.
	 * 
	 * If the primary video link contains nothing resembling a link or contains more text
	 * 		than just a link, the full text is available as videos.text. Otherwise, videos.text is not set.
	 * 
	 * If there are no videos and no video fallback text at all, videos is null.
	 * 
	 * Links to the following sites are recognized as video links: twitch.tv, youtube.com,
	 * 		youtu.be, hitbox.tv, vimeo.com and nicovideo.jp.
	 */
	videos: RunVideos | null;
	/** Alternatively called the description or notes. The text the runner provides that
	 *  appears below the run on the run's page.
	 */
	comment: string | null;
	/** A structure containing the status and possibly the ID of the user that made
	 * 		the status decision. The status can be `new` (not yet reviewed), `verified`
	 * 		or `rejected`.
	 * 
	 *  If the status is `new`, the field examiner is not present.
	 * 
	 * `rejected` runs additionally have a reason string field within their status, 
	 * 		containing the reason message by the examiner.
	 * 
	 * 	`verified` runs have a verify-date field that contains the date when the run
	 * 		was verified. This date can be null for runs that have been verified
	 * 		in the "Old Days".
	 */
	status: RunStatus;
	/** The list of players that participated in the run. Each player can either be a
	 * 		registered user (in that case, the `rel` value is `user` and there is an `id`
	 * 		present) or a guest of whom we only have a name, but no user account 
	 * 		(in that case, `rel` is `guest` and the `name` is present). In both cases, a
	 * 		`uri` is present that links to the player resource.
	 * 
	 * Alternatively, when embedded, a list of Player (User / Guest) resources. These
	 * 		resources contain the `rel` object as well.
	 */
	players: RunPlayer[] | Data<Player[]>;
	/** When the run was played. Shows up in the "Played on" section.
	 * 	Not all runs have a known date, so unfortunately this sometimes is `null`.
	 */
	date: string | null;
	/** The date and time when the run was added on speedrun.com. Can be `null` for old runs. */
	submitted: string | null;
	/** A structure that contains a lot of information and a lot of redundant stuff.
	 * 
	 * `primary` is the time that is relevant for the leaderboard. Different games have different rules
	 * 		as to what eventually counts, and this is the time represented by `primary`.
	 * 
	 * `realtime` is the real-world time of the run.
	 * 
	 * `realtime_noloads` is the real-world time of the run, excluding the loading times.
	 * 		Not all games have a distinction between realtime and realtime w/o loads.
	 * 
	 * `ingame` is the time as measured by the game itself.     
	 * 
	 * Each of those four times is represented twice in the times structure. Once as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
	 * 		duration and once as the number of seconds plus milliseconds (as a float). Use whatever
	 * 		is the easiest in your environment and try to avoid implementing custom date/time parsing.
	 * 
	 * The primary time is always set, each of the three others can be empty depending on the game.
	*/
	times: RunTimes;
	/** Information about the system the run was played on. */
	system: RunSystem;
	/** Contains information about the detailed timing of the run. This field can either be null
	 * 		or a link to the splits. Currently, we support splits.io, but in the future, the link
	 * 		might point to other sites as well, so either blindly follow the link or pay attention to the rel field. */
	splits: Splits | null;
	/** A mapping from variables to values (the key is the variable ID, the value is the valueID).
	 * 		The map represents the custom values for a game (like the speed in Mario Kart, which
	 * 		can be 50/100/150cc). */
	values: Record<string, string>;
	links: RelLink<"self" | "game" | "category" | "level" | "platform" | "region" | "examiner">[];

	/** The resource for the Region the run was played on, if embedded. */
	region?: Data<Region> | Data<never[]>;
	/** The resource for the Platform the run was played on, if embedded. */
	platform?: Data<Platform> | Data<never[]>;
}

// need better names??
export type SendUser = Omit<RunPlayerUser, "uri">;
export type SendGuest = Omit<RunPlayerGuest, "uri">;

export interface PostRun {
	category: string;
	level?: string;
	date?: string;
	region?: string;
	/** This is documented as being optional, but the json schema requires it. */
	platform: string;
	verified?: boolean;
	times: {
		realtime?: number;
		realtime_noloads?: number;
		ingame?: number;
	};
	players?: (SendUser | SendGuest)[];
	emulated?: boolean;
	video?: string;
	comment?: string;
	splitsio?: string;
	variables?: Record<string, {
		type: "pre-defined" | "user-defined";
		value: string;
	}>;

}

export interface Series {
	id: string;
	names: Names;
	abbreviation: string;
	weblink: string;
	moderators: EmbeddableModerators;
	created: string | null;
	assets: Assets;
	links: RelLink<"self" | "games">[];
}

export interface Notification {
	id: string;
	created: string;
	status: "read" | "unread";
	text: string;
	item: RelLink<"post" | "run" | "game" | "guide">;
	links?: [ RelLink<"run" | "game"> ];
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