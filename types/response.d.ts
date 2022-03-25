import { Category, Data, Developer, Engine, Game, GameType, Genre, Guest, Leaderboard, Level, Platform, Profile, Publisher, RankedRun, Region, RelLink, Run, Series, User, Variable } from "./src-api";

interface Pagination {
    offset: number;
    max: number;
    size: number;
    links: [
        RelLink<"next">,
        RelLink<"prev">
    ]
}

interface Paginated<T> {
    data: T;
    pagination: Pagination;
}

type CategoryResponse = Data<Category>;             // GET /categories/{id}
type CategoryVariablesResponse = Data<Variable[]>;  // GET /categories/{id}/variables
type CategoryRecordsResponse = Paginated<Leaderboard[]>;    // GET /categories/{id}/records

type DevelopersResponse = Paginated<Developer[]>;   // GET /developers
type DeveloperResponse = Data<Developer>;           // GET /developers/{id}

type EnginesResponse = Paginated<Engine[]>;         // GET /engines
type EngineResponse = Data<Engine>;                 // GET /engines/{id}

type GamesResponse = Paginated<Game[]>;             // GET /games
type GameResponse = Data<Game>;                     // GET /games/{id}
type GameCategoriesResponse = Data<Category[]>;     // GET /games/{id}/categories
type GameLevelsResponse = Data<Level[]>;            // GET /games/{id}/levels
type GameVariablesResponse = Data<Variable[]>;      // GET /games/{id}/variables
type GameDerivedGamesResponse = Paginated<Game[]>;  // GET /games/{id}/derived-games
type GameRecordsResponse =  Paginated<Leaderboard[]>;   // GET /games/{id}/records

type GameTypesResponse = Paginated<GameType[]>;     // GET /gametypes
type GameTypeResponse = Data<GameType>;             // GET /gametypes/{id}

type GenresResponse = Paginated<Genre[]>;           // GET /genres
type GenreResponse = Data<Genre>;                   // GET /genres/{id}

type GuestResponse = Data<Guest>;                   // GET /guests/{name}

type LeaderboardResponse = Data<Leaderboard>;       // GET /leaderboards/{game}/category/{category}
type LeaderboardLevelResponse = Data<Leaderboard>;  // GET /leaderboards/{game}/level/{level}/{category}

type LevelResponse = Data<Level>;                   // GET /levels/{id}
type LevelCategoriesResponse = Data<Category[]>;    // GET /levels/{id}/categories
type LevelVariablesResponse = Data<Variable[]>;     // GET /levels/{id}/variables
type LevelLeaderboardResponse = Paginated<Leaderboard[]>;   // GET /levels/{id}/records

type NotificationsResponse = Data<Notification[]>;  // GET /notifications

type PlatformsResponse = Paginated<Platform[]>;     // GET /platforms
type PlatformResponse = Data<Platform>;             // GET /platforms/{id}

type ProfileResponse = Data<Profile>;               // GET /profile

type PublishersResponse = Paginated<Publisher[]>;   // GET /publishers
type PublisherResponse = Data<Publisher>;           // GET /publishers/{id}

type RegionsResponse = Paginated<Region[]>;         // GET /regions
type RegionResponse = Data<Region>;                 // GET /regions/{id}

type RunsResponse = Paginated<Run[]>;               // GET /runs
type RunResponse = Data<Run>;                       // GET /runs/{id}

type SeriesAllResponse = Paginated<Series[]>;       // GET /series
type SeriesResponse = Data<Series>;                 // GET /series/{id}
type SeriesGamesResponse = Paginated<Game[]>;       // GET /series/{id}/games

type UsersResponse = Paginated<User[]>;             // GET /users - this query returns a 400 response unless you provide filters
type UserResponse = Data<User>;                     // GET /users/{id}
type UserPersonalBestsResponse = Data<RankedRun[]>; // GET /users/{id}/personal-bests

type VariableResponse = Data<Variable>;             // GET /variables/{id}