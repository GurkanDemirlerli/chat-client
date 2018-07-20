import { Component, OnInit } from '@angular/core';
import { LocalNotificationService } from '../../../../providers';
import { LocalNotificationTypes } from '../../../../enums';
import { LocalNotificationModel } from '../../../../models';

@Component({
    selector: 'app-notifications-tab',
    templateUrl: './notifications-tab.component.html',
    styleUrls: ['./notifications-tab.component.css']
})
export class NotificationsTabComponent {
    notifications: LocalNotificationModel[] = [];
    constructor(
        private localNotificationService: LocalNotificationService
    ) {
        this.localNotificationService.getMylocalNotifications().subscribe((notifications) => {
            notifications.data.forEach(item => {
                let content: String;
                switch (item.contentType) {
                    case LocalNotificationTypes.FRIEND_REQUEST_ACCEPTED:
                        content = item.from.firstname + " " + item.from.lastname + " arkadaşlık isteğini kabul etti.";
                        break;
                    case LocalNotificationTypes.FRIEND_REQUEST_REJECTED:
                        content = item.from.firstname + " " + item.from.lastname + " arkadaşlık isteğini reddetti.";
                        break;
                    default:
                        break;
                }
                const notification: LocalNotificationModel = {
                    _id: item._id,
                    content: content,
                    from: item.from,
                    isRead: item.isRead,
                    createdAt: item.createdAt
                }
                this.notifications.push(notification);
            });
            this.localNotificationService.makeAllNotificationsReaded().subscribe((res) => {
                if (res.success) {
                    this.localNotificationService.emitUnReadedNotificationsCount(0);
                }
            });
        });
    }
}
