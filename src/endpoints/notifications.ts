import { Notification, NotificationsParams, NotificationsResponse } from "../../types";
import { get, GetOptions, http, shimData } from "../http";

/** This will retrieve the notifications for the currently authenticated user. By default, the list is sorted by date descending. 
 * You can control the sorting by using the query string parameters `orderby` and `direction`. The direction can be either `asc` or `desc`,
 * the possible values for `orderby` are listed below.
 * 
 * @param key The API key of the account to fetch the notifications from. Get it from <https://www.speedrun.com/settings/apikey>. Protect it.
 * @param options Options for the HTTP request itself.
 */
export async function getNotifications(key: string, queryParams?: NotificationsParams, options?: GetOptions): Promise<Notification[]> {
	return get<NotificationsResponse>(`/notifications`, queryParams, options, key).then(shimData);
}