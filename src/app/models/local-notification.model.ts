import { LocalNotificationTypes } from "../enums";

export interface LocalNotificationModel {
    _id: String;
    content: String;
    from: {
        _id: String;
        name: String;
        email: String;
    }
    isRead: Boolean;
    createdAt: Date;
}