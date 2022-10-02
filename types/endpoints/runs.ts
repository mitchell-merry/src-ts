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

export interface PostRun {
	category: string;
	level?: string;
	date?: string;
	region?: string;
	/** This is documented as being optional, but the json schema requires it. */
	platform: string;
	verified?: boolean;
	times: {
		realtime?: number;
		realtime_noloads?: number;
		ingame?: number;
	};
	players?: PlayerPartial[];
	emulated?: boolean;
	video?: string;
	comment?: string;
	splitsio?: string;
	variables?: Record<string, {
		type: "pre-defined" | "user-defined";
		value: string;
	}>;
}

export type RunError = ResponseError & { 
	/** a list of problems */
	errors: string[];
}

/** https://github.com/speedruncomorg/api/blob/master/version1/runs.md#post-runs https://github.com/speedruncomorg/api/blob/master/version1/runs.md#post-runs */
export type PostRunResponse = Data<Run>;

export type PutRunStatus = {
	status: {
		status: "verified";
	} | {
		status: "rejected";
		reason: string;
	};
};

/** PUT /runs/{id}/players https://github.com/speedruncomorg/api/blob/master/version1/runs.md#put-runsidplayers */
export type PutRunPlayers = { players: SendPlayer[]; };
export type PutRunPlayersResponse = Data<Run>;

/** PUT /runs/{id}/status https://github.com/speedruncomorg/api/blob/master/version1/runs.md#put-runsidstatus */
export type PutRunStatusResponse = Data<Run>;

/** DELETE /runs/{id} https://github.com/speedruncomorg/api/blob/master/version1/runs.md#delete-runsid */
export type DeleteRunResponse = Data<Run>;