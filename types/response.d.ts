import { Game, RelLink } from "./src-api";

interface Pagination {
    offset: number;
    max: number;
    size: number;
    links: [
        RelLink<"next">,
        RelLink<"prev">
    ]
}

interface GameResponse {
    data: Game;
}

interface GamesResponse {
    data: Game[];
    pagination: Pagination;
}