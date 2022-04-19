export type Data<T> = { data: T; };

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

export type CategoryType = "per-game" | "per-level";
export type CategoryPlayerType = "exactly" | "up-to";

export interface RelLink<rel> {
    rel: rel;
    uri: string;
}

export interface Category {
    id: string;
    name: string;
    weblink: string;
    type: CategoryType;
    rules: string;
    players: {
        type: CategoryPlayerType;
        value: number;
    };
    miscellaneous: boolean;
    links: [
        RelLink<"self">,
        RelLink<"game">,
        RelLink<"variables">,
        RelLink<"records">,
        RelLink<"runs">,
        RelLink<"leaderboard">,
    ];

    game?: Data<Game>;
    variables?: Data<Variable[]>;
}

export interface GameNames {
    international: string;
    japanese: string;
    twitch: string;
}

export type GameRulesetRunTime = "realtime" | "realtime_noloads" | "ingame";

export interface GameRuleset {
    'show-milliseconds': boolean;
    'require-verification': boolean;
    'require-video': boolean;
    'run-times': GameRulesetRunTime[];
    'default-time': GameRulesetRunTime;
    'emulators-allowed': boolean;
}

export type ModeratorType = "super-moderator" | "moderator"; // "verifier" should realistically be an option, but they only show as "super-moderator"s.

export type Moderators = {
    [key: string]: string;
} & { data?: never };

export type EmbeddableModerators = Moderators | Data<User[]>;

export interface Game {
    id: string;
    names: GameNames;
    abbreviation: string;
    weblink: string;
    discord: string;
    released: number;
    'release-date': string;
    ruleset: GameRuleset;
    romhack: boolean;
    gametypes: string[] | Data<GameType[]>;
    platforms: string[] | Data<Platform[]>;
    regions: string[] | Data<Region[]>;
    genres: string[] | Data<Genre[]>;
    engines: string[] | Data<Engine[]>;
    developers: string[] | Data<Developer[]>;
    publishers: string[] | Data<Publisher[]>;
    moderators: EmbeddableModerators;
    created: string | null;
    assets: Assets;
    links: [
        RelLink<"self">,
        RelLink<"runs">,
        RelLink<"levels">,
        RelLink<"categories">,
        RelLink<"variables">,
        RelLink<"records">,
        RelLink<"series">,
        RelLink<"base-game">,
        RelLink<"dervived-games">,
        RelLink<"romhacks">,
        RelLink<"leaderboard">,
    ];

    levels?: Data<Level[]>;
    categories?: Data<Category[]>;
}

export interface BulkGame {
    id: string;
    names: Names;
    abbreviation: string;
    weblink: string;
}

export interface RankedRun {
    place: number;
    run: Run;
}

export interface Leaderboard {
    weblink: string;
    game: string | Data<Game>;
    category: string | Data<Category>;
    level: string | null | Data<Level>;
    platform: string | null;
    region: string | null;
    emulators: string | null;
    'video-only': boolean;
    timing: GameRulesetRunTime;
    values: Record<string, string>;
    runs: RankedRun[];
    links: [
        RelLink<"game">,
        RelLink<"category">,
    ];

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

export interface UserLocation {
    country: {
        code: string;
        names: Names;
    };
    region: {
        code: string;
        names: Names;
    } | null;
}

export interface User { 
    rel?: "user";
    id: string;
    names: Names;
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
    links: [
        RelLink<"self">,
        RelLink<"runs">,
        RelLink<"games">,
        RelLink<"personal-bests">,
    ];
}

export type Profile = User;

export interface Guest {
    name: string;
    rel?: "guest";
    links: [
        RelLink<"self">,
        RelLink<"runs">
    ];
}

export type Player = (User | Guest);

export interface Level {
    id: string;
    name: string;
    weblink: string;
    rules: string;
    links: [
        RelLink<"self">,
        RelLink<"game">,
        RelLink<"categories">,
        RelLink<"variables">,
        RelLink<"runs">,
    ];

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
    rules: string;
    flags: {
        miscellaneous: false;
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
    links: [
        RelLink<"self">,
        RelLink<"game">,
    ];
}

export interface RunVideos {
    text: string;
    links: { uri: string; }[];
}

export interface RunStatusVerified {
    status: "verified";
    examiner: string;
    "verify-date": string;
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

export interface RunTimes {
    primary: string;
    primary_t: number;
    realtime: string | null;
    realtime_t: number | null;
    realtime_noloads: string | null;
    realtime_noloads_t: number | null;
    ingame: string | null;
    ingame_t: number | null;
}

export interface RunSystem {
    platform: string;
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
    game: string | Data<Game>;
    level: string | null | Data<Level>;
    category: string | Data<Category>;
    videos: RunVideos | null;
    comment: string;
    status: RunStatus;
    players: RunPlayer[] | Data<Player[]>;
    date: string | null;
    submitted: string | null;
    times: RunTimes;
    system: RunSystem;
    splits: Splits | null;
    values: Record<string, string>;
    links: [
        RelLink<"self">,
        RelLink<"game">,
        RelLink<"category">,
        RelLink<"level">,
        RelLink<"platform">,
        RelLink<"examiner">,
    ];

    region?: Data<Region>;
    platform?: Data<Platform>;
}

// need better names??
export type SendUser = Omit<RunPlayerUser, "uri">;
export type SendGuest = Omit<RunPlayerGuest, "uri">;

export interface PostRun {
    category: string;
    level?: string;
    date?: string;
    region?: string;
    platform?: string;
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
    variables?: {
        [key: string]: {
            type: "pre-defined" | "user-defined";
            value: string;
        };
    }[];

}

export interface Series {
    id: string;
    names: Names;
    abbreviation: string;
    weblink: string;
    moderators: EmbeddableModerators;
    created: string | null;
    assets: Assets;
    links: [
        RelLink<"self">,
        RelLink<"games">
    ];
}

export interface Notification {
    id: string;
    created: string;
    status: "read" | "unread";
    text: string;
    item: RelLink<"post"> | RelLink<"run"> | RelLink<"game"> | RelLink<"guide">;
    links: [ RelLink<"run"> | RelLink<"game"> | null];
}

export interface GameType {
    id: string;
    name: string;
    "allows-base-game": boolean;
    links: [
        RelLink<"self">,
        RelLink<"games">
    ];
}

export interface Platform {
    id: string;
    name: string;
    released: number;
    links: [
        RelLink<"self">,
        RelLink<"games">,
        RelLink<"runs">,
    ];
}

export interface Region {
    id: string;
    name: string;
    links: [
        RelLink<"self">,
        RelLink<"games">,
        RelLink<"runs">,
    ];
}

export interface Genre {
    id: string;
    name: string;
    links: [
        RelLink<"self">,
        RelLink<"games">
    ];
}

export interface Engine {
    id: string;
    name: string;
    links: [
        RelLink<"self">,
        RelLink<"games">
    ];
}

export interface Developer {
    id: string;
    name: string;
    links: [
        RelLink<"self">,
        RelLink<"games">
    ];
}

export interface Publisher {
    id: string;
    name: string;
    links: [
        RelLink<"self">,
        RelLink<"games">
    ];
}