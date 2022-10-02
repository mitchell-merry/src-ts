// Some common utility types

/** Utility type to uniquely identify a leaderboard. */
export interface LeaderboardPartial {
	/** The id of the game for the leaderboard. */
	game: string;
	/** The id of the level for the leaderboard, if a level leaderboard. Not set if full-game. */
	level?: string;
	/** The id of the category for the leaderboard. */
	category: string;
	/** A mapping of variable IDs to values. Should have a value set for every mandatory variable of the category. */
	variables: Record<string, string>
}