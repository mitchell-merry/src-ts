import { AdditionalEmbed, Embeddable, SubEmbeds } from "../embed";
import { Data, RelLink } from "../other";
import { Category } from "./Category";
import { Game, TimingMethod } from "./Game";
import { Level } from "./Level";
import { Platform, Region } from "./other";
import { Run } from "./Run";
import { User } from "./User";
import { Variable } from "./Variable";

/**
 * https://github.com/speedruncomorg/api/blob/master/version1/leaderboards.md
 * 
 * Leaderboards contain non-obsolete [runs](https://github.com/speedruncomorg/api/blob/master/version1/runs.md), sorted by time descending. In contrast to raw runs, leaderboards are automatically grouped according to the game/category/level rules that the moderators have defined.
 */
export type Leaderboard<Embed extends string = ""> = {
	/** A link to the leaderboard on speedrun.com */
	weblink: string;
	/** The id of the game the leaderboard belongs to. Alternatively, when embedded, the Game resource. Data<[]>: https://github.com/speedruncomorg/api/issues/118 */
	game: Embeddable<Embed, "game", string, Data<Game<SubEmbeds<Embed, "game">> | []>>;
	/** The id of the level the leaderboard belongs to. (null if full-game) Alternatively, when embedded, the Level resource. Data<[]>: https://github.com/speedruncomorg/api/issues/118 */
	level: Embeddable<Embed, "level", string | null, Data<Level<SubEmbeds<Embed, "level">> | []>>;
	/** The id of the category the leaderboard belongs to. Alternatively, when embedded, the Category resource. Data<[]>: https://github.com/speedruncomorg/api/issues/118 */
	category: Embeddable<Embed, "category", string, Data<Category<SubEmbeds<Embed, "category">> | []>>;
	/** platform ID, when set. `null` otherwise */
	platform: string | null;
	/** region ID, when set. `null` otherwise */
	region: string | null;
	/** When null, real devices and emulators are included in `runs`. When set to a `true` value, only emulators are included, else only real devices are included.
	 * 
	 * (A query paramater for the `GET /leaderboards` endpoints.)
	 */
	emulators: boolean | null;
	/** Whether or not only runs with a video are included.
	 * 
	 * (A query paramater for the `GET /leaderboards` endpoints.)
	 */
	"video-only": boolean;
	/** The timing method the runs are ranked by. */
	timing: TimingMethod;
	/** A mapping between variable ID and value ID applicable to this leaderbord. */
	values: Record<string, string>;
	/** A list of runs on the leaderboard. */
	runs: RankedRun[];
	/** Related links to other resources. */
	links: RelLink<"game" | "category" | "level">[];
}
// TODO WORKAROUND TO FIX EMBED TYPE HINTS
& { id: string }
& AdditionalEmbed<Embed, "players", { players: Data<User[]> }>
& AdditionalEmbed<Embed, "regions", { regions: Data<Region[]> }>
& AdditionalEmbed<Embed, "platforms", { platforms: Data<Platform[]> }>
& AdditionalEmbed<Embed, "variables", { variables: Data<Variable[]> }>;

export interface RankedRun {
	/** The place this run has on the related leaderbord. */
	place: number;
	/** The run object */
	run: Omit<Run, 'links'>;
}