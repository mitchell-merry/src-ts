import { AdditionalEmbed, Embeddable, SubEmbeds } from "../embed";
import { Data, RelLink } from "../other";
import { Category } from "./Category";
import { Game } from "./Game";
import { Level } from "./Level";
import { Platform, Region } from "./other";
import { Guest, User } from "./User";

export type Run<Embed extends string = ""> = {
	/** ID values can vary in length, and uniquely represent a run. */
	id: string;
	/** The weblink of the run on speedrun.com.  */
	weblink: string;
	/** The id of the game the run belongs to. Alternatively, when embedded, the Game resource. Data<[]>: https://github.com/speedruncomorg/api/issues/118 */
	game: Embeddable<Embed, "game", string, Data<Game<SubEmbeds<Embed, "game">> | []>>;
	/** The id of the level the run belongs to. (null if full-game) Alternatively, when embedded, the Level resource. Data<[]>: https://github.com/speedruncomorg/api/issues/118 */
	level: Embeddable<Embed, "level", string | null, Data<Level<SubEmbeds<Embed, "level">> | []>>;
	/** The id of the category the run belongs to. Alternatively, when embedded, the Category resource. Data<[]>: https://github.com/speedruncomorg/api/issues/118 */
	category: Embeddable<Embed, "category", string, Data<Category<SubEmbeds<Embed, "category">> | []>>;
	/** Contains information about all video links that have been provided for the run. This includes the primary video (most runs only have one video, some have none at all) and all videos mentioned in the `comment`s.
	 * 
	 * If the primary video link contains nothing resembling a link or contains more text than just a link, the full text is available as videos.text. Otherwise, videos.text is not set.
	 * 
	 * If there are no videos and no video fallback text at all, videos is null.
	 * 
	 * Links to the following sites are recognized as video links: twitch.tv, youtube.com, youtu.be, hitbox.tv, vimeo.com and nicovideo.jp.
	 */
	videos: RunVideos | null;
	/** Alternatively called the description or notes. The text the runner provides that appears below the run on the run's page. */
	comment: string | null;
	/** A structure containing the status and possibly the ID of the user that made the status decision. The status can be `new` (not yet reviewed), `verified` or `rejected`.
	 * 
	 *  If the status is `new`, the field examiner is not present.
	 * 
	 * `rejected` runs additionally have a reason string field within their status,  containing the reason message by the examiner.
	 * 
	 * 	`verified` runs have a verify-date field that contains the date when the run was verified. This date can be null for runs that have been verified in the "Old Days".
	 */
	status: RunStatus;
	/** The list of players that participated in the run. Each player can either be a registered user (in that case, the `rel` value is `user` and there is an `id` present) or a guest of whom we only have a name, but no user account  (in that case, `rel` is `guest` and the `name` is present). In both cases, a `uri` is present that links to the player resource.
	 *  Alternatively, when embedded, a list of Player (User / Guest) resources. These resources contain the `rel` object as well. */
	players: Embeddable<Embed, "players", RunPlayer[], Data<Player[]>>;
	/** When the run was played. Shows up in the "Played on" section. Not all runs have a known date, so unfortunately this sometimes is `null`. */
	date: string | null;
	/** The date and time when the run was added on speedrun.com. Can be `null` for old runs. */
	submitted: string | null;
	/** A structure that contains a lot of information and a lot of redundant stuff.
	 * 
	 * `primary` is the time that is relevant for the leaderboard. Different games have different rules as to what eventually counts, and this is the time represented by `primary`.
	 * 
	 * `realtime` is the real-world time of the run.
	 * 
	 * `realtime_noloads` is the real-world time of the run, excluding the loading times. Not all games have a distinction between realtime and realtime w/o loads.
	 * 
	 * `ingame` is the time as measured by the game itself.     
	 * 
	 * Each of those four times is represented twice in the times structure. Once as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) duration and once as the number of seconds plus milliseconds (as a float). Use whatever is the easiest in your environment and try to avoid implementing custom date/time parsing.
	 * 
	 * The primary time is always set, each of the three others can be empty depending on the game.
	*/
	times: RunTimes;
	/** Information about the system the run was played on. */
	system: RunSystem;
	/** Contains information about the detailed timing of the run. This field can either be null or a link to the splits. Currently, we support splits.io, but in the future, the link might point to other sites as well, so either blindly follow the link or pay attention to the rel field. */
	splits: Splits | null;
	/** A mapping from variables to values (the key is the variable ID, the value is the valueID). The map represents the custom values for a game (like the speed in Mario Kart, which can be 50/100/150cc). */
	values: Record<string, string>;
	links: RelLink<"self" | "game" | "category" | "level" | "platform" | "region" | "examiner">[];
}
// TODO WORKAROUND TO FIX EMBED TYPE HINTS
& { id: string }
& AdditionalEmbed<Embed, "region", { region: Data<Region | []> }>
& AdditionalEmbed<Embed, "platform", { platform: Data<Platform | []> }>;

export interface RunVideos {
	links: { uri: string; }[];
}

export interface RunStatusVerified {
	status: "verified";
	examiner: string;
	"verify-date": string | null;
}

export interface RunStatusNew {
	status: "new";
}

export interface RunStatusRejected {
	status: "rejected";
	examiner: string;
	reason: string;
}

export type RunStatus = RunStatusVerified | RunStatusNew | RunStatusRejected;

export type UserRel = { rel: "user"; }
export type GuestRel = { rel: "guest"; }

export type RunPlayerUser = {
	rel: "user";
	id: string;
	uri: string;
}

export type RunPlayerGuest = {
	rel: "guest";
	name: string;
	uri: string;
}

export type RunPlayer = RunPlayerUser | RunPlayerGuest;
export type Player = (UserRel & User) | (GuestRel & Guest);


export interface RunSystem {
	/** The id of the platform played. */
	platform: string | null;
	/** Whether the run was played using an emulator (true) or on console (false). */
	emulated: boolean;
	/** The region the run was played on. */
	region: string | null;
}

export interface Splits {
	/** The hosting site for the splits. Currently only supports splits.io, but may support more in the future. */
	rel: "splits.io";
	/** The splits resource. */
	uri: string;
}

export type RunTime<T extends string> = { [k in T | `${T}_t`]: k extends T ? string : number; }
export type EmptyRunTime<T extends string> = { [k in T | `${T}_t`]: k extends T ? null : 0; }

export type RealTime = RunTime<"realtime"> | EmptyRunTime<"realtime">
export type RealTimeNoLoads = RunTime<"realtime_noloads"> | EmptyRunTime<"realtime_noloads">
export type InGameTime = RunTime<"ingame"> | EmptyRunTime<"ingame">

export type RunTimes = RunTime<"primary"> & RealTime & RealTimeNoLoads & InGameTime;