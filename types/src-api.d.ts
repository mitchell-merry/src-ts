type Data<T> = { data: T; };

interface Names {
    international: string;
    japanese: string | null;
}

interface Asset {
    uri: string;
    width: number;
    height: number;
}

interface Assets {
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

type CategoryType = "per-game" | "per-level";
type CategoryPlayerType = "exactly" | "up-to";

interface RelLink<rel> {
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
        "type": CategoryPlayerType;
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

interface GameNames {
    international: string;
    japanese: string;
    twitch: string;
}

type GameRulesetRunTime = "realtime" | "realtime_noloads" | "ingame";

interface GameRuleset {
    'show-milliseconds': boolean;
    'require-verification': boolean;
    'require-video': boolean;
    'run-times': GameRulesetRunTime[];
    'default-time': GameRulesetRunTime;
    'emulators-allowed': boolean;
}

type ModeratorType = "super-moderator" | "moderator"; // "verifier" should realistically be an option, but they only show as "super-moderator"s.

type Moderators = {
    [key: string]: string;
} & { data?: never };

type EmbeddableModerators = Moderators | Data<User[]>;

interface Game {
    id: string;
    names: GameNames;
    abbreviation: string;
    weblink: string;
    discord: string;
    released: number;
    'release-date': string;
    ruleset: GameRulesetRunTime;
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

interface RankedRun {
    place: number;
    run: Run;
}

interface Leaderboard {
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

type Link = { uri: string; };

interface Color {
    light: string;
    dark: string;
}

interface NameStyleSolid {
    style: "solid";
    color: Color;
}

interface NameStyleGradient {
    style: "gradient";
    "color-to": Color;
    "color-from": Color;
}

type NameStyle = NameStyleSolid | NameStyleGradient;

type UserRole = "banned" | "user" | "trusted" | "moderator" | "admin" | "programmer";

interface UserLocation {
    country: {
        code: string;
        names: Names;
    };
    region: {
        code: string;
        names: Names;
    } | null;
}

interface User { 
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

type Profile = User;

interface Guest {
    name: string;
    rel?: "guest";
    links: [
        RelLink<"self">,
        RelLink<"runs">
    ];
}

type Player = (User | Guest);

interface Level {
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

// TODO rethink variable scope system
interface VariableScopeSingleLevel {
    type: "single-level";
    level: string;
}

type VariableScopeType = "global" | "full-game" | "all-levels";

interface VariableScopeOther {
    type: VariableScopeType;
}

type VariableScope = VariableScopeSingleLevel | VariableScopeOther;

interface VariableValue {
    label: string;
    rules: string;
    flags: {
        miscellaneous: false;
    }
}

interface VariableValues {
    values: Record<string, VariableValue>;
    default: string | null;
}

interface Variable {
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

interface RunVideos {
    text: string;
    links: { uri: string; }[];
}

interface RunStatusVerified {
    status: "verified";
    examiner: string;
    "verify-date": string;
}

interface RunStatusNew {
    status: "new";
}

interface RunStatusRejected {
    status: "rejected";
    examiner: string;
    reason: string;
}

type RunStatus = RunStatusVerified | RunStatusNew | RunStatusRejected;

interface RunPlayerUser {
    rel: "user";
    id: string;
    uri: string;
}

interface RunPlayerGuest {
    rel: "guest";
    name: string;
    uri: string;
}

type RunPlayer = RunPlayerUser | RunPlayerGuest;

interface RunTimes {
    primary: string;
    primary_t: number;
    realtime: string | null;
    realtime_t: number | null;
    realtime_noloads: string | null;
    realtime_noloads_t: number | null;
    ingame: string | null;
    ingame_t: number | null;
}

interface RunSystem {
    platform: string;
    emulated: boolean;
    region: string | null;
}

interface Splits {
    rel: string;
    uri: string;
}

interface Run {
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
    submitted: null;
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

interface Series {
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

interface Notification {
    id: string;
    created: string;
    status: "read" | "unread";
    text: string;
    item: RelLink<"post"> | RelLink<"run"> | RelLink<"game"> | RelLink<"guide">;
    links: [ RelLink<"run"> | RelLink<"game"> | null];
}

interface GameType {
    id: string;
    name: string;
    "allows-base-game": boolean;
    links: [
        RelLink<"self">,
        RelLink<"games">
    ];
}

interface Platform {
    id: string;
    name: string;
    released: number;
    links: [
        RelLink<"self">,
        RelLink<"games">,
        RelLink<"runs">,
    ];
}

interface Region {
    id: string;
    name: string;
    links: [
        RelLink<"self">,
        RelLink<"games">,
        RelLink<"runs">,
    ];
}

interface Genre {
    id: string;
    name: string;
    links: [
        RelLink<"self">,
        RelLink<"games">
    ];
}

interface Engine {
    id: string;
    name: string;
    links: [
        RelLink<"self">,
        RelLink<"games">
    ];
}

interface Developer {
    id: string;
    name: string;
    links: [
        RelLink<"self">,
        RelLink<"games">
    ];
}

interface Publisher {
    id: string;
    name: string;
    links: [
        RelLink<"self">,
        RelLink<"games">
    ];
}