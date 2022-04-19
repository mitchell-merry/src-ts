import { Category, Data, Developer, Engine, Game, GameType, Genre, Guest, Leaderboard, Level, Notification, Platform, Profile, Publisher, RankedRun, Region, RelLink, Run, Series, User, Variable } from "./src-api";

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

export type CategoryResponse = Data<Category>;             // GET /categories/{id}
export type CategoryParams = Embed;

export type CategoryVariablesResponse = Data<Variable[]>;  // GET /categories/{id}/variables
export type CategoryVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos"> & Embed;

export type CategoryRecordsResponse = Paginated<Leaderboard[]>;    // GET /categories/{id}/records
export type CategoryRecordsParams = {
    top?: number;
    "skip-empty"?: boolean;
} & Embed & PaginatedParams;

export type DevelopersResponse = Paginated<Developer[]>;   // GET /developers
export type DevelopersParams = SortParams<"name"> & PaginatedParams;

export type DeveloperResponse = Data<Developer>;           // GET /developers/{id}

export type EnginesResponse = Paginated<Engine[]>;         // GET /engines
export type EnginesParams = SortParams<"name"> & PaginatedParams;         

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
    _bulk?: boolean;    // TODO better bulk access support
    max?: number;
}
export type GamesParams = GamesFilter & Embed & SortParams<"name.int" | "name.jap" | "abbreviation" | "released" | "created" | "similarity"> & PaginatedParams;

export type GameResponse = Data<Game>;                     // GET /games/{id}
export type GameParams = Embed;

export type GameCategoriesResponse = Data<Category[]>;     // GET /games/{id}/categories
export type GameCategoriesParams = {
    miscellaneous?: boolean;
} & Embed & SortParams<"name" | "miscellaneous" | "pos">;

export type GameLevelsResponse = Data<Level[]>;            // GET /games/{id}/levels
export type GameLevelsParams = SortParams<"name" | "pos"> & Embed;

export type GameVariablesResponse = Data<Variable[]>;      // GET /games/{id}/variables
export type GameVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos" > & Embed;

export type GameDerivedGamesResponse = Paginated<Game[]>;  // GET /games/{id}/derived-games
export type GameDerivedGamesParams = GameParams & { romhack: undefined; } & PaginatedParams;

export type GameRecordsResponse =  Paginated<Leaderboard[]>;   // GET /games/{id}/records
export type GameRecordsParams = {
    top?: number;
    scope?: string;
    miscellaneous?: boolean;
    "skip-empty"?: boolean;
} & Embed & PaginatedParams;

export type GameTypesResponse = Paginated<GameType[]>;     // GET /gametypes
export type GameTypesParams = SortParams<"name"> & PaginatedParams;

export type GameTypeResponse = Data<GameType>;             // GET /gametypes/{id}

export type GenresResponse = Paginated<Genre[]>;           // GET /genres
export type GenresParams = SortParams<"name"> & PaginatedParams;

export type GenreResponse = Data<Genre>;                   // GET /genres/{id}

export type GuestResponse = Data<Guest>;                   // GET /guests/{name}

export type LeaderboardResponse = Data<Leaderboard>;       // GET /leaderboards/{game}/category/{category}
export type LeaderboardParams = {
    top?: number;
    platform?: string;
    region?: string;
    emulators?: boolean;
    'video-only'?: boolean;
    timing?: string;
    date?: string;
    [key: `var-${string}`]: string;
} & Embed;

export type LeaderboardLevelResponse = Data<Leaderboard>;  // GET /leaderboards/{game}/level/{level}/{category}
export type LeaderboardLevelParams = LeaderboardParams;

export type LevelResponse = Data<Level>;                   // GET /levels/{id}
export type LevelParams = Embed;

export type LevelCategoriesResponse = Data<Category[]>;    // GET /levels/{id}/categories
export type LevelCategoriesParams = {
    miscellaneous?: boolean;
} & SortParams<"name" | "miscellaneous" | "pos"> & Embed;

export type LevelVariablesResponse = Data<Variable[]>;     // GET /levels/{id}/variables
export type LevelVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos"> & Embed;

export type LevelLeaderboardResponse = Paginated<Leaderboard[]>;   // GET /levels/{id}/records
export type LevelLeaderboardParams = {
    top?: number;
    "skip-empty"?: boolean;
} & Embed & PaginatedParams;

export type NotificationsResponse = Data<Notification[]>;  // GET /notifications
export type NotificationsParams = SortParams<"created">;

export type PlatformsResponse = Paginated<Platform[]>;     // GET /platforms
export type PlatformsParams = SortParams<"name" | "released"> & PaginatedParams;

export type PlatformResponse = Data<Platform>;             // GET /platforms/{id}

export type ProfileResponse = Data<Profile>;               // GET /profile

export type PublishersResponse = Paginated<Publisher[]>;   // GET /publishers
export type PublishsersParams = SortParams<"name"> & PaginatedParams;

export type PublisherResponse = Data<Publisher>;           // GET /publishers/{id}

export type RegionsResponse = Paginated<Region[]>;         // GET /regions
export type RegionsParams = SortParams<"name"> & PaginatedParams;

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
} & SortParams<"game" | "category" | "level" | "platform" | "region" | "emulated" | "date" | "submitted" | "status" | "verify-date"> & Embed & PaginatedParams;

export type RunResponse = Data<Run>;                       // GET /runs/{id}
export type RunParams = Embed;

export type SeriesAllResponse = Paginated<Series[]>;       // GET /series
export type SeriesAllParams = {
    name?: string;
    abbreviation?: string;
    moderator?: string;
} & SortParams<"name.int" | "name.jap" | "abbreviation" | "created"> & Embed & PaginatedParams;

export type SeriesResponse = Data<Series>;                 // GET /series/{id}
export type SeriesParams = Embed;

export type SeriesGamesResponse = Paginated<Game[]>;       // GET /series/{id}/games
export type SeriesGamesParams = GamesParams & PaginatedParams;

export type UsersResponse = Paginated<User[]>;             // GET /users - this query returns a 400 response unless you provide filters
export type UsersParams = {
    lookup?: string;
    name?: string;
    twitch?: string;
    hitbox?: string;
    twitter?: string;
    speedrunslive?: string;
} & SortParams<"name.int" | "name.jap" | "signup" | "role"> & Embed & PaginatedParams;

export type UserResponse = Data<User>;                     // GET /users/{id}
export type UserPersonalBestsResponse = Data<RankedRun[]>; // GET /users/{id}/personal-bests
export type UserPersonalBestsParams = {
    top?: number;
    series?: string;
    game?: string;
} & Embed;

export type VariableResponse = Data<Variable>;             // GET /variables/{id}