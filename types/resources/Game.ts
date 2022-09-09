import { AdditionalEmbed, Embeddable, SubEmbeds } from '../embed';
import { Assets, Data, ModeratorType, Names, RelLink } from '../other';
import { Category } from './Category';
import { Level } from './Level';
import { Developer, Engine, GameType, Genre, Platform, Publisher, Region } from './other';
import { User } from './User';
import { Variable } from './Variable';

/**
 * https://github.com/speedruncomorg/api/blob/master/version1/games.md#structure
 * 
 * Games are the things users do speedruns in. 
 * 
 * Games are associated with regions (US, Europe, ...), platforms (consoles, handhelds, ...), genres, engines, developers, game types, publishers, categories, levels and custom variables (like speed=50/100/150cc in Mario Kart games).
 * 
 * Games that are not part of a series are categorized in the "N/A" series for backwards compatibility.
 */
 export type Game<Embed extends string = ""> = {
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
	/** The year the game was released.
	 * 
	 * @deprecated superceded by release-date
	 */
	released: number;
	/** An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) encoded datetime representing when the game was released. */
	"release-date": string;
	/** Contains extra flags for the game's ruleset. */
	ruleset: GameRuleset;
	/** @deprecated superceded by `gametypes`. */
	romhack: boolean;
	/** A list of game types IDs set for the game. This list can be empty. Alternatively embeds all assigned gametypes. */
	gametypes: Embeddable<Embed, "gametypes", string[], Data<GameType[]>>;
	/** A list of platform IDs the game can be played on. This list can be empty. Alternatively embeds all assigned regions. */
	platforms: Embeddable<Embed, "platforms", string[], Data<Platform[]>>;
	/** A list of region IDs the game is available in. This list can be empty. Alternatively embeds all assigned regions. */
	regions: Embeddable<Embed, "regions", string[], Data<Region[]>>;
	/** A list of genre IDs set for the game. This list can be empty. Alternatively embeds all assigned genres. */
	genres: Embeddable<Embed, "genres", string[], Data<Genre[]>>;
	/** A list of engine IDs set for the game. This list can be empty. Alternatively embeds all assigned engines. */
	engines: Embeddable<Embed, "engines", string[], Data<Engine[]>>;
	/** A list of developer IDs set for the game. This list can be empty. Alternative embeds all assigned developers. */
	developers: Embeddable<Embed, "developers", string[], Data<Developer[]>>;
	/** A list of publisher IDs set for the game. This list can be empty. Alternatively embeds the assigned publishers. */
	publishers: Embeddable<Embed, "publishers", string[], Data<Publisher[]>>;
	/** A mapping of user IDs to their roles within the game. 
	 *  Possible roles are moderator and super-moderator (super moderators can appoint other users as moderators).
	 * 
	 *  Note that the API will falsely flag the role for verifiers as `super-moderator`. Be careful with trusting this value.
	 * 
	 *  Alternatively embeds the users as full user resources.
	 */
	moderators: Embeddable<Embed, "moderators", Record<string, ModeratorType>, Data<User[]>>;
	/** An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) encoded datetime representing when the game was added to speedrun.com.
	 * 
	 *  Can be null for games that have been added in the early days of speedrun.com.
	 */
	created: string | null;
	/** Links to images that are used for the game on speedrun.com */
	assets: Assets;
	/** `base-game` is only returned for games that have a base game set.
	 * 
	 * `romhacks` is a legacy value. New code should use derived-games instead.
	 * 
	 * `series` can appear multiple times, as games can be in multiple series.
	 */
	links: RelLink<"self" | "runs" | "levels" | "categories" | "variables" | "records" | "series" | "base-game" | "derived-games" | "romhacks" | "leaderboard">[];
}
& AdditionalEmbed<Embed, "levels", { levels: Data<Level<SubEmbeds<Embed, "levels">>[]> }>
& AdditionalEmbed<Embed, "categories", { categories: Data<Category<SubEmbeds<Embed, "categories">>[]> }>
& AdditionalEmbed<Embed, "variables", { variables: Data<Variable[]> }>;

export type BulkGame = {
	id: string;
	names: Names;
	abbreviation: string;
	weblink: string;
}

export type GameNames = Names & {
	/** Twitch name for the game. If none are set, empty string. */
	twitch: string;
}

export type TimingMethod = "realtime" | "realtime_noloads" | "ingame";

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
	/** A list of times that can/should be given for any run of that game.  */
	"run-times": TimingMethod[];
	/** Determines the primary timing method for the game (one of the options in `run-times`). */
	"default-time": TimingMethod;
	/** If emulator submissions are allowed. */
	"emulators-allowed": boolean;
}