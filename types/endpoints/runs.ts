import { Callback, Embed, Paginated, PaginatedParams, SortParams, ResponseError } from "./util";
import { GuestRel, PlayerGuestPartial, PlayerPartial, PlayerPartialUri, PlayerUserPartial, Run, UserRel } from "../resources";
import { Data } from "../other";

/** GET /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runs */
export type RunsResponse<E extends string = ""> = Paginated<Run<E>>;
export type RunsParams = {
	/** user ID; when given, only returns runs played by that user */
	user?: string;
	/** when given, only returns runs done by that guest */
	guest?: string;
	/** user ID; when given, only returns runs examined by that user */
	examiner?: string;
	/** game ID; when given, restricts to that game */
	game?: string;
	/** level ID; when given, restricts to that level */
	level?: string;
	/** category ID; when given, restricts to that category */
	category?: string;
	/** platform ID; when given, restricts to that platform */
	platform?: string;
	/** region ID; when given, restricts to that region */
	region?: string;
	/** whether only games run on emulator will be returned */
	emulated?: boolean | "yes" | 1;
	/** filters by run status */
	status?: "new" | "verified" | "rejected";
} & SortParams<"game" | "category" | "level" | "platform" | "region" | "emulated" | "date" | "submitted" | "status" | "verify-date"> & Embed & PaginatedParams & Callback;

/** GET /runs/{id} https://github.com/speedruncomorg/api/blob/master/version1/runs.md#get-runsid */
export type RunResponse<E extends string = ""> = Data<Run<E>>;
export type RunParams = Embed & Callback;

/** @deprecated Use `PlayerUserPartial` instead. */
export type SendUser = PlayerUserPartial;
/** @deprecated Use `PlayerGuestPartial` instead. */
export type SendGuest = PlayerGuestPartial;
/** @deprecated Use `PlayerPartial` instead. */
export type SendPlayer = PlayerPartial;

/** For more info, check out [speedrun.com's JSON Schema](https://github.com/speedruncomorg/api/blob/master/version1/json-schema/run-submit.json). */
export interface PostRun {
	/** The id of the category to submit to. The game can be inferred from the category / level. */
	category: string;
	/** If a level run, the id of the level to submit to. The game can be inferred from the category / level. */
	level?: string;
	/** An [ISO 8601 date string](https://en.wikipedia.org/wiki/ISO_8601#Dates) indicating the date the run was performed. Defaults to the current date. */
	date?: string;
	/** The region id associated to the run. Leave undefined to not specify any. */
	region?: string;
	/** The platform id of the run. This is documented as being optional, but the json schema requires it. */
	platform: string;
	/** Whether or not the run should be auto-verified on submit. Can only be set if the user submitting is a moderator of the game. */
	verified?: boolean;
	/** The times of the run. At least one time pf the times allowed by the game must be set. */
	times: {
		/** The RTA time of the run, as a number of seconds, including milliseconds. */
		realtime?: number;
		/** The RTA without loads time of the run, as a number of seconds, including milliseconds. */
		realtime_noloads?: number;
		/** The IGT of the run, as a number of seconds, including milliseconds. */
		ingame?: number;
	};
	/** The participating players of the run. When not set, the run is assumed to be performed by the user submitting the request. Regular users (i.e. non-game mods and non-global mods) cannot set this element. Otherwise, you can specify a list of users and/or "guests" that participated in the run. 
	 * 
	 * Note that even as a game mod, setting this to have more than one player will result in an error.
	*/
	players?: PlayerPartial[];
	/** Whether or not the run used an emulator. Defaults to false. */
	emulated?: boolean;
	/** The video link to the run. Must be a valid URL using HTTP or HTTPS as its protocol. Note that some games require a video to be included. */
	video?: string;
	/** The description of the run. You can put additional video links in here, if you have multiple Twitch VODs for example. */
	comment?: string;
	/** A URI for the splits of the run. If given, it should be the splits.io ID or a full URL to the splits. */
	splitsio?: string;
	/** The variable values for the new run. Some games have mandatory variables. Depending on the variable type, you can give the ID of a pre-defined (i.e. previously submitted by someone) value or submit a new one. */
	variables?: Record<string, {
		type: "pre-defined" | "user-defined";
		value: string;
	}>;
}

/** Shape of response for errors on POST/PUT /runs endpoints. */
export type RunError = ResponseError & { 
	/** a list of problems */
	errors: string[];
}

/** POST /runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#post-runs */
export type PostRunResponse = Data<Run>;

export type PutRunStatus = {
	status: {
		/** * `verified` is to indicate the run should be verified. */
		status: "verified";
	} | {
		/** * `rejected` is to indicate the run should be rejected. */
		status: "rejected";
		/** The provided reason for rejecting the run, i.e. why it is invalid. */
		reason: string;
	};
};

/** PUT /runs/{id}/players https://github.com/speedruncomorg/api/blob/master/version1/runs.md#put-runsidplayers */
export type PutRunPlayers = { players: PlayerPartial[]; };
export type PutRunPlayersResponse = Data<Run>;

/** PUT /runs/{id}/status https://github.com/speedruncomorg/api/blob/master/version1/runs.md#put-runsidstatus */
export type PutRunStatusResponse = Data<Run>;

/** DELETE /runs/{id} https://github.com/speedruncomorg/api/blob/master/version1/runs.md#delete-runsid */
export type DeleteRunResponse = Data<Run>;