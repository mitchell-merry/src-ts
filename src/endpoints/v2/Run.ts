import { HTTPOptions, httpV2 } from "../../http";

// all temporary until v2 officially releases

export type OK = { ok: boolean; };
export type V2Error = { error: string; };

export enum RunVerificationStatus {
    Pending = 0,
    Verified = 1,
    Rejected = 2,
};

export type PutRunVerificationRequest = {
    runId: string;
    verified: RunVerificationStatus;
    reason?: string;
}

/** Sets the status of a run. */
export function PutRunVerification(params: PutRunVerificationRequest, PHPSESSID: string, options?: HTTPOptions) {
    return httpV2('/PutRunVerification', 'post', PHPSESSID, { body: params, ...options }) as Promise<OK | V2Error>;
}

export type PutRunAssigneeRequest = {
    assigneeId: string;
    runId: string;
}

/** Assigns a run to a verifier. */
export function PutRunAssignee(params: PutRunAssigneeRequest, PHPSESSID: string, options?: HTTPOptions) {
    return httpV2('/PutRunAssignee', 'post', PHPSESSID, { body: params, ...options }) as Promise<Record<string, never> | V2Error>;
}