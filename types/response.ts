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

export interface SRCError {
    status: number;
    message: string;
    links: [ RelLink<"support">, RelLink<"report-issues"> ];
}

export interface Callback {
    callback?: boolean;
}

/** GET /categories/{id} https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesid */
export type CategoryResponse = Data<Category>;
export type CategoryParams = Embed & Callback;

/** GET /categories/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesidvariables */
export type CategoryVariablesResponse = Data<Variable[]>;
export type CategoryVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos"> & Embed & Callback;

/** GET /categories/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/categories.md#get-categoriesidrecords */
export type CategoryRecordsResponse = Paginated<Leaderboard[]>;
export type CategoryRecordsParams = {
    top?: number;
    "skip-empty"?: boolean;
} & Embed & PaginatedParams & Callback;

/** GET /developers https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-developers */
export type DevelopersResponse = Paginated<Developer[]>;
export type DevelopersParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /developers/{id} https://github.com/speedruncomorg/api/blob/master/version1/developers.md#get-developersid */
export type DeveloperResponse = Data<Developer>;

/** GET /engines https://github.com/speedruncomorg/api/blob/master/version1/engines.md#get-engines */
export type EnginesResponse = Paginated<Engine[]>;
export type EnginesParams = SortParams<"name"> & PaginatedParams & Callback;    

/** GET /engines/{id} https://github.com/speedruncomorg/api/blob/master/version1/engines.md#get-enginesid */
export type EngineResponse = Data<Engine>;

/** GET /games https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-games */
export type GamesResponse = Paginated<Game[]>;
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

/** GET /games?_bulk=yes https://github.com/speedruncomorg/api/blob/master/version1/games.md#bulk-access */
export type BulkGamesResponse = Paginated<BulkGame>;
export type BulkGamesParams = Omit<GamesParams, "_bulk" | "embed"> & { 
    _bulk: true; // bulk mode must be enabled
}

/** GET /games/{id} https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesid */
export type GameResponse = Data<Game>;
export type GameParams = Embed & Callback;

/** GET /games/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidcategories */
export type GameCategoriesResponse = Data<Category[]>;
export type GameCategoriesParams = {
    miscellaneous?: boolean;
} & Embed & SortParams<"name" | "miscellaneous" | "pos"> & Callback;

/** GET /games/{id}/levels https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidlevels */
export type GameLevelsResponse = Data<Level[]>;
export type GameLevelsParams = SortParams<"name" | "pos"> & Embed & Callback;

/** GET /games/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidvariables */
export type GameVariablesResponse = Data<Variable[]>;
export type GameVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos" > & Embed & Callback;

/** GET /games/{id}/derived-games https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidderived-games */
export type GameDerivedGamesResponse = Paginated<Game[]>;
export type GameDerivedGamesParams = GameParams & { romhack: undefined; } & PaginatedParams & Callback;

/** GET /games/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/games.md#get-gamesidrecords */
export type GameRecordsResponse =  Paginated<Leaderboard[]>;
export type GameRecordsParams = {
    top?: number;
    scope?: string;
    miscellaneous?: boolean;
    "skip-empty"?: boolean;
} & Embed & PaginatedParams & Callback;

/** GET /gametypes https://github.com/speedruncomorg/api/blob/master/version1/gametypes.md#get-gametypes */
export type GameTypesResponse = Paginated<GameType[]>;
export type GameTypesParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /gametypes/{id} https://github.com/speedruncomorg/api/blob/master/version1/gametypes.md#get-gametypesid */
export type GameTypeResponse = Data<GameType>;

/** GET /genres https://github.com/speedruncomorg/api/blob/master/version1/genres.md#get-genres */
export type GenresResponse = Paginated<Genre[]>;
export type GenresParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /genres/{id} https://github.com/speedruncomorg/api/blob/master/version1/genres.md#get-genresid */
export type GenreResponse = Data<Genre>;

/** GET /guests/{name} https://github.com/speedruncomorg/api/blob/master/version1/guests.md#get-guestsname */
export type GuestResponse = Data<Guest>;

/** GET /leaderboards/{game}/category/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamecategorycategory */
export type LeaderboardResponse = Data<Leaderboard>;
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

/** GET /leaderboards/{game}/level/{level}/{category} https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md#get-leaderboardsgamelevellevelcategory */
export type LeaderboardLevelResponse = Data<Leaderboard>;
export type LeaderboardLevelParams = LeaderboardParams;

/** GET /levels/{id} https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsid */
export type LevelResponse = Data<Level>;
export type LevelParams = Embed & Callback;

/** GET /levels/{id}/categories https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidcategories */
export type LevelCategoriesResponse = Data<Category[]>;
export type LevelCategoriesParams = {
    miscellaneous?: boolean;
} & SortParams<"name" | "miscellaneous" | "pos"> & Embed & Callback;

/** GET /levels/{id}/variables https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidvariables */
export type LevelVariablesResponse = Data<Variable[]>
export type LevelVariablesParams = SortParams<"name" | "mandatory" | "user-defined" | "pos"> & Embed & Callback;

/** GET /levels/{id}/records https://github.com/speedruncomorg/api/blob/master/version1/levels.md#get-levelsidrecords */
export type LevelLeaderboardResponse = Paginated<Leaderboard[]>;
export type LevelLeaderboardParams = {
    top?: number;
    "skip-empty"?: boolean;
} & Embed & PaginatedParams & Callback;

/** GET /notifications https://github.com/speedruncomorg/api/blob/master/version1/notifications.md#get-notifications */
export type NotificationsResponse = Data<Notification[]>;
export type NotificationsParams = SortParams<"created"> & Callback;

/** GET /platforms https://github.com/speedruncomorg/api/blob/master/version1/platforms.md#get-platforms */
export type PlatformsResponse = Paginated<Platform[]>;
export type PlatformsParams = SortParams<"name" | "released"> & PaginatedParams & Callback;

/** GET /platforms/{id} https://github.com/speedruncomorg/api/blob/master/version1/platforms.md#get-platformsid */
export type PlatformResponse = Data<Platform>;

/** GET /profile https://github.com/speedruncomorg/api/blob/master/version1/profile.md#get-profile */
export type ProfileResponse = Data<Profile>;

/** GET /publishers https://github.com/speedruncomorg/api/blob/master/version1/publishers.md#get-publishers */
export type PublishersResponse = Paginated<Publisher[]>;
export type PublishsersParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /publishers/{id} https://github.com/speedruncomorg/api/blob/master/version1/publishers.md#get-publishersid */
export type PublisherResponse = Data<Publisher>;

/** GET /regions https://github.com/speedruncomorg/api/blob/master/version1/regions.md#get-regions */
export type RegionsResponse = Paginated<Region[]>;
export type RegionsParams = SortParams<"name"> & PaginatedParams & Callback;

/** GET /regions/{id} https://github.com/speedruncomorg/api/blob/master/version1/regions.md#get-regionsid */
export type RegionResponse = Data<Region>;

/** GET /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runs */
export type RunsResponse = Paginated<Run[]>;
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

/** GET /runs/{id} https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runsid */
export type RunResponse = Data<Run>;
export type RunParams = Embed & Callback;

/** https://github.com/speedruncomorg/api/blob/master/version1/runs.md#post-runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#post-runs */
export type PostRunResponse = Data<Run> | (
    SRCError & { errors: string[]; }
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
/** PUT /runs/{id}/players https://github.com/speedruncomorg/api/blob/master/version1/runs.md#put-runsidplayers */
export type PutRunPlayersResponse = Data<Run>;

/** DELETE /runs/{id} https://github.com/speedruncomorg/api/blob/master/version1/runs.md#delete-runsid */
export type DeleteRunResponse = Data<Run>;

/** GET /series https://github.com/speedruncomorg/api/blob/master/version1/series.md#get-series */
export type SeriesAllResponse = Paginated<Series[]>;
export type SeriesAllParams = {
    name?: string;
    abbreviation?: string;
    moderator?: string;
} & SortParams<"name.int" | "name.jap" | "abbreviation" | "created"> & Embed & PaginatedParams & Callback;

/** GET /series/{id} https://github.com/speedruncomorg/api/blob/master/version1/series.md#get-seriesid */
export type SeriesResponse = Data<Series>;
export type SeriesParams = Embed & Callback;

/** GET /series/{id}/games https://github.com/speedruncomorg/api/blob/master/version1/series.md#get-seriesidgames */
export type SeriesGamesResponse = Paginated<Game[]>;
export type SeriesGamesParams = GamesParams & PaginatedParams & Callback;

/** GET /users - This query returns a 400 response unless you provide filters. https://github.com/speedruncomorg/api/blob/master/version1/users.md#get-users */
export type UsersResponse = Paginated<User[]>;
export type UsersParams = {
    lookup?: string;
    name?: string;
    twitch?: string;
    hitbox?: string;
    twitter?: string;
    speedrunslive?: string;
} & SortParams<"name.int" | "name.jap" | "signup" | "role"> & Embed & PaginatedParams & Callback;

/** GET /users/{id} https://github.com/speedruncomorg/api/blob/master/version1/users.md#get-usersid */
export type UserResponse = Data<User>;
/** GET /users/{id}/personal-bests https://github.com/speedruncomorg/api/blob/master/version1/users.md#get-usersidpersonal-bests */
export type UserPersonalBestsResponse = Data<RankedRun[]>;
export type UserPersonalBestsParams = {
    top?: number;
    series?: string;
    game?: string;
} & Embed & Callback;

/** GET /variables/{id} https://github.com/speedruncomorg/api/blob/master/version1/variables.md#get-variablesid */
export type VariableResponse = Data<Variable>;