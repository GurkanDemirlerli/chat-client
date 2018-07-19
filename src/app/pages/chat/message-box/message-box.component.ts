import { Socket } from 'ng-socket-io';
import { Component, OnInit, Input, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MessageService, UserService, AuthService } from '../../../providers';
import { ActivatedFriendModel } from '../../../models';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
    private _activatedFriend: ActivatedFriendModel;
    friend;
    me;
    messages = [];
    input = "";
    @Input()
    set activatedFriend(activatedFriend) {
        if (activatedFriend) {
            console.log(activatedFriend);
            this._activatedFriend = activatedFriend;
            this.messageService.listChat(this._activatedFriend._id).subscribe((messages) => {
                this.messages = messages.data;
            });
            this.messageService.makeChatMessagesReaded(activatedFriend._id).subscribe((res) => {

            });

            this.authService.getMyProfileCard().subscribe((me) => {
                this.me = me.data;
            });

        }
    }

    get activatedFriend() { return this._activatedFriend };

    constructor(
        private socket: Socket,
        private userService: UserService,
        private messageService: MessageService,
        private authService: AuthService
    ) {
        this.getMessages().subscribe(message => {
            console.log(message);
            this.messages.push(message);
        });

        this.observeIsReaded().subscribe(data => {
            this.messages.forEach(message => {
                if (message.isRead == false) {
                    message.isRead = true;
                }
            });
        });
    }

    observeIsReaded() {
        let observable = new Observable(observer => {
            this.socket.on('messagesReaded', data => {
                if (this._activatedFriend) {
                    if (data == this._activatedFriend._id) {
                        observer.next(data);
                    }
                }

            });
        });
        return observable;
    }

    getMessages() {
        let observable = new Observable(observer => {
            this.socket.on('receiveMessage', data => {
                console.log(data);
                if (this._activatedFriend) {
                    if (data.from._id == this._activatedFriend._id) {
                        observer.next(data);
                        this.messageService.makeChatMessagesReaded(this._activatedFriend._id).subscribe((res) => {
                        });
                    }
                }
            });
        });
        return observable;
    }

    sendMessage() {
        const message = {
            to: this._activatedFriend._id,
            content: this.input,
            ownerFriendship: this._activatedFriend.friendshipId,
        }
        this.messageService.add(message).subscribe((res) => {
            // console.log(res.data);
            this.messages.push(res.data);
        });
        this.input = "";
    }

    ngOnInit() {

    }

}
