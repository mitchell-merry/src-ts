import { BulkGame, Category, Data, Developer, Engine, Game, GameType, Genre, Guest, Leaderboard, Level, Notification, Platform, Profile, Publisher, RankedRun, Region, RelLink, Run, SendGuest, SendUser, Series, User, Variable } from "./src-api";

export interface Pagination {
    offset: number;
    max: number;
    size: number;
    links: (RelLink<"next"> | RelLink<"prev">)[]
}

export interface Paginated<T> {
    data: T;
    pagination: Pagination;
}

export interface PaginatedParams {
    offset?: number;
    max?: number;
}

export interface SortParams<orderby> {
    direction?: "asc" | "desc";
    orderby?: orderby;
}

// I'd really like to make this more complex for each possible
// comma-separated list of embeds. Unfortunately, there are 11 options
// for Game and thus I can't support it.
export interface Embed {
    embed?: string;
}

export interface Error {
    status: number;
    message: string;
    links: [ RelLink<"support">, RelLink<"report-issues"> ];
}

export interface Callback {
    callback?: boolean;
}

export type CategoryResponse = Data<Category>;             // GET /categories/{id}
export type CategoryParams = Embed & Callback;

export type CategoryVariablesResponse = Data<Variable[]>;  // GET /categories/{id}/variables
export type CategoryVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos"> & Embed & Callback;

export type CategoryRecordsResponse = Paginated<Leaderboard[]>;    // GET /categories/{id}/records
export type CategoryRecordsParams = {
    top?: number;
    "skip-empty"?: boolean;
} & Embed & PaginatedParams & Callback;

export type DevelopersResponse = Paginated<Developer[]>;   // GET /developers
export type DevelopersParams = SortParams<"name"> & PaginatedParams & Callback;

export type DeveloperResponse = Data<Developer>;           // GET /developers/{id}

export type EnginesResponse = Paginated<Engine[]>;         // GET /engines
export type EnginesParams = SortParams<"name"> & PaginatedParams & Callback;         

export type EngineResponse = Data<Engine>;                 // GET /engines/{id}

export type GamesResponse = Paginated<Game[]>;             // GET /games
export type GamesFilter = {
    name?: string;
    abbreviation?: string;
    released?: number;
    gametype?: string;
    platform?: string;
    region?: string;
    genre?: string;
    engine?: string;
    developer?: string;
    publisher?: string;
    moderator?: string;
    romhack?: boolean;
    _bulk?: false;
}
export type GamesParams = GamesFilter & Embed & SortParams<"name.int" | "name.jap" | "abbreviation" | "released" | "created" | "similarity"> & PaginatedParams & Callback;

export type BulkGamesResponse = Paginated<BulkGame>;
export type BulkGamesParams = Omit<GamesParams, "_bulk" | "embed"> & { 
    _bulk: true; // bulk mode must be enabled
}

export type GameResponse = Data<Game>;                     // GET /games/{id}
export type GameParams = Embed & Callback;

export type GameCategoriesResponse = Data<Category[]>;     // GET /games/{id}/categories
export type GameCategoriesParams = {
    miscellaneous?: boolean;
} & Embed & SortParams<"name" | "miscellaneous" | "pos"> & Callback;

export type GameLevelsResponse = Data<Level[]>;            // GET /games/{id}/levels
export type GameLevelsParams = SortParams<"name" | "pos"> & Embed & Callback;

export type GameVariablesResponse = Data<Variable[]>;      // GET /games/{id}/variables
export type GameVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos" > & Embed & Callback;

export type GameDerivedGamesResponse = Paginated<Game[]>;  // GET /games/{id}/derived-games
export type GameDerivedGamesParams = GameParams & { romhack: undefined; } & PaginatedParams & Callback;

export type GameRecordsResponse =  Paginated<Leaderboard[]>;   // GET /games/{id}/records
export type GameRecordsParams = {
    top?: number;
    scope?: string;
    miscellaneous?: boolean;
    "skip-empty"?: boolean;
} & Embed & PaginatedParams & Callback;

export type GameTypesResponse = Paginated<GameType[]>;     // GET /gametypes
export type GameTypesParams = SortParams<"name"> & PaginatedParams & Callback;

export type GameTypeResponse = Data<GameType>;             // GET /gametypes/{id}

export type GenresResponse = Paginated<Genre[]>;           // GET /genres
export type GenresParams = SortParams<"name"> & PaginatedParams & Callback;

export type GenreResponse = Data<Genre>;                   // GET /genres/{id}

export type GuestResponse = Data<Guest>;                   // GET /guests/{name}

export type LeaderboardResponse = Data<Leaderboard>;       // GET /leaderboards/{game}/category/{category}
export type LeaderboardParams = {
    top?: number;
    platform?: string;
    region?: string;
    emulators?: boolean;
    "video-only"?: boolean;
    timing?: string;
    date?: string;
    [key: `var-${string}`]: string;
} & Embed & Callback;

export type LeaderboardLevelResponse = Data<Leaderboard>;  // GET /leaderboards/{game}/level/{level}/{category}
export type LeaderboardLevelParams = LeaderboardParams & Callback;

export type LevelResponse = Data<Level>;                   // GET /levels/{id}
export type LevelParams = Embed & Callback;

export type LevelCategoriesResponse = Data<Category[]>;    // GET /levels/{id}/categories
export type LevelCategoriesParams = {
    miscellaneous?: boolean;
} & SortParams<"name" | "miscellaneous" | "pos"> & Embed & Callback;

export type LevelVariablesResponse = Data<Variable[]>;     // GET /levels/{id}/variables
export type LevelVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos"> & Embed & Callback;

export type LevelLeaderboardResponse = Paginated<Leaderboard[]>;   // GET /levels/{id}/records
export type LevelLeaderboardParams = {
    top?: number;
    "skip-empty"?: boolean;
} & Embed & PaginatedParams & Callback;

export type NotificationsResponse = Data<Notification[]>;  // GET /notifications
export type NotificationsParams = SortParams<"created"> & Callback;

export type PlatformsResponse = Paginated<Platform[]>;     // GET /platforms
export type PlatformsParams = SortParams<"name" | "released"> & PaginatedParams & Callback;

export type PlatformResponse = Data<Platform>;             // GET /platforms/{id}

export type ProfileResponse = Data<Profile>;               // GET /profile

export type PublishersResponse = Paginated<Publisher[]>;   // GET /publishers
export type PublishsersParams = SortParams<"name"> & PaginatedParams & Callback;

export type PublisherResponse = Data<Publisher>;           // GET /publishers/{id}

export type RegionsResponse = Paginated<Region[]>;         // GET /regions
export type RegionsParams = SortParams<"name"> & PaginatedParams & Callback;

export type RegionResponse = Data<Region>;                 // GET /regions/{id}

export type RunsResponse = Paginated<Run[]>;               // GET /runs
export type RunsParams = {
    user?: string;
    guest?: string;
    examiner?: string;
    game?: string;
    level?: string;
    category?: string;
    platform?: string;
    region?: string;
    emulated?: boolean | "yes" | true;
    status?: "new" | "verified" | "rejected";
} & SortParams<"game" | "category" | "level" | "platform" | "region" | "emulated" | "date" | "submitted" | "status" | "verify-date"> & Embed & PaginatedParams & Callback;

export type RunResponse = Data<Run>;                       // GET /runs/{id}
export type RunParams = Embed & Callback;

export type PostRunResponse = Data<Run> | (
    Error & { errors: string[]; }
);

export type PutRunStatus = {
    status: {
        status: "verified";
    } | {
        status: "rejected";
        reason: string;
    };
};

export type PutRunPlayers = {
    players: (SendUser | SendGuest)[];
};
export type PutRunPlayersResponse = Data<Run>;

// No request body
export type DeleteRunResponse = Data<Run>;

export type SeriesAllResponse = Paginated<Series[]>;       // GET /series
export type SeriesAllParams = {
    name?: string;
    abbreviation?: string;
    moderator?: string;
} & SortParams<"name.int" | "name.jap" | "abbreviation" | "created"> & Embed & PaginatedParams & Callback;

export type SeriesResponse = Data<Series>;                 // GET /series/{id}
export type SeriesParams = Embed & Callback;

export type SeriesGamesResponse = Paginated<Game[]>;       // GET /series/{id}/games
export type SeriesGamesParams = GamesParams & PaginatedParams & Callback;

export type UsersResponse = Paginated<User[]>;             // GET /users - this query returns a 400 response unless you provide filters
export type UsersParams = {
    lookup?: string;
    name?: string;
    twitch?: string;
    hitbox?: string;
    twitter?: string;
    speedrunslive?: string;
} & SortParams<"name.int" | "name.jap" | "signup" | "role"> & Embed & PaginatedParams & Callback;

export type UserResponse = Data<User>;                     // GET /users/{id}
export type UserPersonalBestsResponse = Data<RankedRun[]>; // GET /users/{id}/personal-bests
export type UserPersonalBestsParams = {
    top?: number;
    series?: string;
    game?: string;
} & Embed & Callback;

export type VariableResponse = Data<Variable>;             // GET /variables/{id}