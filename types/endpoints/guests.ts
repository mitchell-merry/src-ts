import { Guest } from "../resources";
import { Data } from "../other";

/** GET /guests/{name} https://github.com/speedruncomorg/api/blob/master/version1/guests.md#get-guestsname */
export type GuestResponse = Data<Guest>;