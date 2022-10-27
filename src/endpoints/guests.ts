import { Guest, GuestResponse } from "../../types";
import { get, GetOptions, shimData } from "../http";

/** This will retrieve a guest, identified by their name. The name is case-insensitive.
 * 
 * @param guest The name of the guest.
 * @param options Options for the HTTP request itself.
 */
export async function getGuest(guest: string, options?: GetOptions): Promise<Guest> {
	return get<GuestResponse>(`/guests/${guest}`, {}, options).then(shimData);
}