import { Socket } from 'ng-socket-io';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../../providers';

@Component({
    selector: 'app-friends-tab',
    templateUrl: './friends-tab.component.html',
    styleUrls: ['./friends-tab.component.css']
})
export class FriendsTabComponent implements OnInit {
    @Output() activatedFriendOutput = new EventEmitter();
    friends = [];
    activatedFriend = "";

    drogbaPicture = "http://img2.cdn.turkiyegazetesi.com.tr/images/Resources/2014/5/10/700x155282_drogba_1.jpg";
    messiPicture = "http://www.kimnereli.net/wp-content/uploads/Messi-310x250.jpg";

    constructor(
        private socket: Socket,
        private userService: UserService
    ) {
        this.userService.getMyFriends().subscribe((friends) => {
            this.friends = friends.data;
            console.log(this.friends);
        });

        this.observeBeingOnline().subscribe(friendId => {
            this.friends.forEach(friend => {
                if (friend._id == friendId) {
                    friend.status = 'online';
                    console.log(this.friends);
                }
            });
        });

        this.observeBeingOffline().subscribe(friendId => {
            this.friends.forEach(friend => {
                if (friend._id == friendId) {
                    friend.status = 'offline';
                    console.log(this.friends);

                }
            });
        });

        this.observeUnreadedMessages().subscribe((data: any) => {
            this.friends.forEach(friend => {
                if (friend._id == data.from._id && this.activatedFriend != data.from._id) {
                    friend.unReadedMessagesCount++;
                }
            });
        });

    }

    observeBeingOnline() {
        let observable = new Observable(observer => {
            this.socket.on('beingOnline', data => {
                observer.next(data);
            });
        });
        return observable;
    }

    observeBeingOffline() {
        let observable = new Observable(observer => {
            this.socket.on('beingOffline', data => {
                observer.next(data);
            });
        });
        return observable;
    }

    observeUnreadedMessages() {
        let observable = new Observable(observer => {
            this.socket.on('receiveMessage', data => {
                observer.next(data);
            });
        });
        return observable;
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



    ngOnInit() {
    }

}
