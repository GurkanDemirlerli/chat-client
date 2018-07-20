import { MyProfileCardModel } from './../../../models';
import {
    AuthService,
    LocalNotificationService,
    FriendShipService
} from '../../../providers';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-friendship-box',
    templateUrl: './friendship-box.component.html',
    styleUrls: ['./friendship-box.component.css']
})
export class FriendShipBoxComponent {
    @Output() activatedFriendOutput = new EventEmitter();
    activeTab = "friends-tab";
    myProfileCard: MyProfileCardModel;
    notificationCount = 0;
    receivedFriendRequestsCount = 0;

    constructor(
        private authService: AuthService,
        private localNotificationService: LocalNotificationService,
        private friendshipService: FriendShipService
    ) {
        this.authService.getMyProfileCard().subscribe((myProfileCard) => {
            this.myProfileCard = myProfileCard.data;
        });
        this.localNotificationService.unReadedNotificationsCount.subscribe((value) => {
            this.notificationCount = value;
        });

        this.friendshipService.receivedFriendRequestsCount.subscribe((value) => {
            this.receivedFriendRequestsCount = value;
        });
    }

    changeTab(clickedTab: string) {
        if (this.activeTab !== clickedTab) {
            this.activeTab = clickedTab;
        }
    }

    changeActivatedFriend(friend) {
        this.activatedFriendOutput.emit(friend);
    }

}
