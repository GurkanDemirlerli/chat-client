import { FriendShipService, UserService } from './../../../../providers';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-search-tab',
    templateUrl: './search-tab.component.html',
    styleUrls: ['./search-tab.component.css']
})
export class SearchTabComponent {
    searchInput = "";
    users;

    constructor(
        private friendshipService: FriendShipService,
        private userService: UserService,
    ) {

    }

    searchUsers(input) {
        if (input.length > 2) {
            this.userService.searchUsersByName(input).subscribe((users) => {
                this.users = users.data;
            });
        }
    }

    sendFriendShipRequest(userId) {
        this.friendshipService.sendFriendShipRequest(userId).subscribe((result) => {
            if (result.success) {
                this.users.forEach(user => {
                    if (user._id == userId) {
                        user.sendedRequestWaiting = result.data._id;
                        user.isSendedRequestWaiting = true;
                    }
                });
            }
        });
    }

    acceptFriendShipRequest(friendShipRequestId, userId) {
        this.friendshipService.acceptFriendShipRequest(friendShipRequestId).subscribe((result) => {
            if (result.success) {
                this.users.forEach(user => {
                    if (user._id == userId) {
                        user.isFriend = true;
                        user.isReceivedRequestWaiting = false;
                    }
                });
            } else {
                console.log('HATA');
            }
        });
    }

    rejectFriendShipRequest(friendShipRequestId, userId) {
        this.friendshipService.rejectFriendShipRequest(friendShipRequestId).subscribe((result) => {
            if (result.success) {
                this.users.forEach(user => {
                    if (user._id == userId) {
                        user.isReceivedRequestWaiting = false;
                    }
                });
            }
        });
    }

    cancelSendedFriendShipRequest(friendShipRequestId, userId) {
        this.friendshipService.cancelSendedFriendShipRequest(friendShipRequestId).subscribe((result) => {
            if (result.success) {
                this.users.forEach(user => {
                    if (user._id == userId) {
                        user.isSendedRequestWaiting = false;
                    }
                });
            }
        });
    }

}
