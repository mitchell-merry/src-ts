import { Category, Data, Developer, Engine, Game, GameType, Genre, Guest, Leaderboard, Level, Platform, Profile, Publisher, RankedRun, Region, RelLink, Run, Series, User, Variable } from "./src-api";

export interface Pagination {
    offset: number;
    max: number;
    size: number;
    links: [
        RelLink<"next">,
        RelLink<"prev">
    ]
}

export interface Paginated<T> {
    data: T;
    pagination: Pagination;
}

export type CategoryResponse = Data<Category>;             // GET /categories/{id}
export type CategoryVariablesResponse = Data<Variable[]>;  // GET /categories/{id}/variables
export type CategoryRecordsResponse = Paginated<Leaderboard[]>;    // GET /categories/{id}/records

export type DevelopersResponse = Paginated<Developer[]>;   // GET /developers
export type DeveloperResponse = Data<Developer>;           // GET /developers/{id}

export type EnginesResponse = Paginated<Engine[]>;         // GET /engines
export type EngineResponse = Data<Engine>;                 // GET /engines/{id}

export type GamesResponse = Paginated<Game[]>;             // GET /games
export type GameResponse = Data<Game>;                     // GET /games/{id}
export type GameCategoriesResponse = Data<Category[]>;     // GET /games/{id}/categories
export type GameLevelsResponse = Data<Level[]>;            // GET /games/{id}/levels
export type GameVariablesResponse = Data<Variable[]>;      // GET /games/{id}/variables
export type GameDerivedGamesResponse = Paginated<Game[]>;  // GET /games/{id}/derived-games
export type GameRecordsResponse =  Paginated<Leaderboard[]>;   // GET /games/{id}/records

export type GameTypesResponse = Paginated<GameType[]>;     // GET /gametypes
export type GameTypeResponse = Data<GameType>;             // GET /gametypes/{id}

export type GenresResponse = Paginated<Genre[]>;           // GET /genres
export type GenreResponse = Data<Genre>;                   // GET /genres/{id}

export type GuestResponse = Data<Guest>;                   // GET /guests/{name}

export type LeaderboardResponse = Data<Leaderboard>;       // GET /leaderboards/{game}/category/{category}
export type LeaderboardLevelResponse = Data<Leaderboard>;  // GET /leaderboards/{game}/level/{level}/{category}

export type LevelResponse = Data<Level>;                   // GET /levels/{id}
export type LevelCategoriesResponse = Data<Category[]>;    // GET /levels/{id}/categories
export type LevelVariablesResponse = Data<Variable[]>;     // GET /levels/{id}/variables
export type LevelLeaderboardResponse = Paginated<Leaderboard[]>;   // GET /levels/{id}/records

export type NotificationsResponse = Data<Notification[]>;  // GET /notifications

export type PlatformsResponse = Paginated<Platform[]>;     // GET /platforms
export type PlatformResponse = Data<Platform>;             // GET /platforms/{id}

export type ProfileResponse = Data<Profile>;               // GET /profile

export type PublishersResponse = Paginated<Publisher[]>;   // GET /publishers
export type PublisherResponse = Data<Publisher>;           // GET /publishers/{id}

export type RegionsResponse = Paginated<Region[]>;         // GET /regions
export type RegionResponse = Data<Region>;                 // GET /regions/{id}

export type RunsResponse = Paginated<Run[]>;               // GET /runs
export type RunResponse = Data<Run>;                       // GET /runs/{id}

export type SeriesAllResponse = Paginated<Series[]>;       // GET /series
export type SeriesResponse = Data<Series>;                 // GET /series/{id}
export type SeriesGamesResponse = Paginated<Game[]>;       // GET /series/{id}/games

export type UsersResponse = Paginated<User[]>;             // GET /users - this query returns a 400 response unless you provide filters
export type UserResponse = Data<User>;                     // GET /users/{id}
export type UserPersonalBestsResponse = Data<RankedRun[]>; // GET /users/{id}/personal-bests

export type VariableResponse = Data<Variable>;             // GET /variables/{id}