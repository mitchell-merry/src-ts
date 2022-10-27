import { Profile, ProfileResponse } from "../../types";
import { get, GetOptions, shimData } from "../http";

/** The profile is the user resource of the currently [authenticated](https://github.com/speedruncomorg/api/blob/master/authentication.md) user.
 * This is useful to see what user a given API key belongs to.
 * 
 * @param key The API key of the account to fetch the profile of. Get it from <https://www.speedrun.com/settings/apikey>. Protect it.
 * @param options Options for the HTTP request itself.
 */
export async function getProfile(key: string, options?: GetOptions): Promise<Profile> {
	return get<ProfileResponse>(`/profile`, {}, options, key).then(shimData);
}