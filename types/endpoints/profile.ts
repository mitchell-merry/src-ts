import { Profile } from "../resources";
import { Data } from "../other";

/** GET /profile https://github.com/speedruncomorg/api/blob/master/version1/profile.md#get-profile */
export type ProfileResponse = Data<Profile>;