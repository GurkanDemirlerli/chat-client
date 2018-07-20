import { Component, Output, EventEmitter } from '@angular/core';
import { FriendShipService } from '../../../../providers';

@Component({
    selector: 'app-friends-tab',
    templateUrl: './friends-tab.component.html',
    styleUrls: ['./friends-tab.component.css']
})
export class FriendsTabComponent {
    @Output() activatedFriendOutput = new EventEmitter();
    friends = [];
    activatedFriend = "";

    constructor(
        private friendshipService: FriendShipService,
    ) {
        this.friendshipService.listFriends().subscribe((friends) => {
            this.friends = friends.data;
        });

        this.friendshipService.observeBeingOnline().subscribe(friendId => {
            this.friends.forEach(friend => {
                if (friend._id == friendId) {
                    friend.status = 'online';
                }
            });
        });

        this.friendshipService.observeBeingOffline().subscribe(friendId => {
            this.friends.forEach(friend => {
                if (friend._id == friendId) {
                    friend.status = 'offline';
                }
            });
        });

        this.friendshipService.observeUnreadMessages().subscribe((data: any) => {
            this.friends.forEach(friend => {
                if (friend._id == data.from && this.activatedFriend != data.from) {
                    friend.unReadedMessagesCount++;
                }
            });
        });
    }

    toggleActivatedFriend(friendId) {
        if (friendId !== this.activatedFriend) {
            this.activatedFriend = friendId;
            this.friends.forEach(friend => {
                if (this.activatedFriend == friend._id) {
                    friend.unReadedMessagesCount = 0;
                    this.activatedFriendOutput.emit(friend);
                }
            });
        }
    }

}
