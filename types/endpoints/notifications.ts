import { Notification } from "../resources";
import { Callback, SortParams } from "./util";
import { Data } from "../other";

/** GET /notifications https://github.com/speedruncomorg/api/blob/master/version1/notifications.md#get-notifications */
export type NotificationsResponse = Data<Notification[]>;
export type NotificationsParams = SortParams<"created"> & Callback;