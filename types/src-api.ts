/** Wrapper for a pattern in the src API where response objects are contained within a "data" property. */
export type Data<T> = { data: T; };

export interface RelLink<rel> {
    rel: rel;
    uri: string;
}

export interface Names {
    international: string;
    japanese: string | null;
}

export interface Asset {
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
    international: string;
    japanese: string;
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
    /** A list of times that can/should be given for any run of that game and can be contain any combination of "realtime", "realtime_noloads" and "ingame".  */
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
export type Moderators = Record<string, ModeratorType> & { data?: never };

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
    /** Legacy value representing the year the game was released. */
    released: number;
    /** An [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) encoded datetime representing when the game was released. */
    "release-date": string;
    /** Contains extra flags for the game's ruleset. */
    ruleset: GameRuleset;
    /** Legacy value superceded by `gametype`. */
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
     * An [ISO_8601](https://en.wikipedia.org/wiki/ISO_8601) encoded datetime representing when the game was added to speedrun.com.
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

    levels?: Data<Level[]>;
    categories?: Data<Category[]>;
    variables?: Data<Variable[]>;
}

export interface BulkGame {
    id: string;
    names: Names;
    abbreviation: string;
    weblink: string;
}

export interface RankedRun {
    place: number;
    run: Omit<Run, 'players' | 'links'> & { players: RunPlayer[] };
}

export interface Leaderboard {
    weblink: string;
    game: string | Data<Game> | Data<never[]>;
    category: string | Data<Category> | Data<never[]>;
    level: string | null | Data<Level> | Data<never[]>;
    platform: string | null;
    region: string | null;
    emulators: boolean | null;
    "video-only": boolean;
    timing: GameRulesetRunTime;
    values: Record<string, string>;
    runs: RankedRun[];
    links: RelLink<"game" | "category" | "level">[];

    players?: Data<User[]>;
    regions?: Data<Region[]>;
    platforms?: Data<Platform[]>;
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
    realtime: string;
    realtime_t: number;
} | {
	realtime: null;
	realtime_t: 0;
};

export type RealTimeNoLoads = {
    realtime_noloads: string;
    realtime_noloads_t: number;
} | {
	realtime_noloads: null;
	realtime_noloads_t: 0;
};

export type InGameTime = {
    ingame: string;
    ingame_t: number;
} | {
	ingame: null;
	ingame_t: 0;
};

export type RunTimes = {
    primary: string;
    primary_t: number;
} & RealTime & RealTimeNoLoads & InGameTime;

export interface RunSystem {
    platform: string | null;
    emulated: boolean;
    region: string | null;
}

export interface Splits {
    rel: string;
    uri: string;
}

export interface Run {
    id: string;
    weblink: string;
    game: string | Data<Game> | Data<never[]>;
    level: string | null | Data<Level> | Data<never[]>;
    category: string | Data<Category> | Data<never[]>;
    videos: RunVideos | null;
    comment: string | null;
    status: RunStatus;
    players: RunPlayer[] | Data<Player[]>;
    date: string | null;
    submitted: string | null;
    times: RunTimes;
    system: RunSystem;
    splits: Splits | null;
    values: Record<string, string>;
    links: RelLink<"self" | "game" | "category" | "level" | "platform" | "region" | "examiner">[];

    region?: Data<Region> | Data<never[]>;
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
    }>[];

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