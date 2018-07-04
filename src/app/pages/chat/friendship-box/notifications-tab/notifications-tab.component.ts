import { Socket } from 'ng-socket-io';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService, LocalNotificationService } from '../../../../providers';
import { LocalNotificationTypes } from '../../../../enums';
import { LocalNotificationModel } from '../../../../models';

@Component({
    selector: 'app-notifications-tab',
    templateUrl: './notifications-tab.component.html',
    styleUrls: ['./notifications-tab.component.css']
})
export class NotificationsTabComponent implements OnInit {
    notifications: LocalNotificationModel[] = [];
    art = 1;
    constructor(
        private socket: Socket,
        private userService: UserService,
        private localNotificationService: LocalNotificationService
    ) {
        this.localNotificationService.getMylocalNotifications().subscribe((notifications) => {
            notifications.data.forEach(item => {
                let content: String;
                switch (item.contentType) {
                    case LocalNotificationTypes.FRIEND_REQUEST_ACCEPTED:
                        content = item.from.name + " arkadaşlık isteğini kabul etti.";
                        break;
                    case LocalNotificationTypes.FRIEND_REQUEST_REJECTED:
                        content = item.from.name + " arkadaşlık isteğini reddetti.";
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
                console.log(this.notifications);
            });
        });
    }

    arttir() {
        this.localNotificationService.emitUnReadedNotificationsCount(this.art);
        this.art++;
    }

    ngOnInit() {
    }

}
