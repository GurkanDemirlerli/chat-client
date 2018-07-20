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
export class MessageBoxComponent {
    private _activatedFriend: ActivatedFriendModel;
    friend;
    me;
    messages = [];
    input = "";
    @Input()
    set activatedFriend(activatedFriend) {
        if (activatedFriend) {
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
        private messageService: MessageService,
        private authService: AuthService
    ) {
        this.messageService.observeReceivingMessages().subscribe((message: any) => {
            if (this._activatedFriend) {
                if (message.from === this._activatedFriend._id) {
                    this.messages.push(message);
                    this.messageService.makeChatMessagesReaded(this._activatedFriend._id).subscribe((res) => {
                    });
                }
            }
        });

        this.messageService.observeIsRead().subscribe(data => {
            if (this._activatedFriend) {
                if (data === this._activatedFriend._id) {
                    this.messages.forEach(message => {
                        if (message.isRead === false) {
                            message.isRead = true;
                        }
                    });
                }
            }
        });
    }

    sendMessage() {
        const message = {
            to: this._activatedFriend._id,
            content: this.input,
            ownerFriendship: this._activatedFriend.friendshipId,
        }
        this.messageService.add(message).subscribe((res) => {
            this.messages.push(res.data);
        });
        this.input = "";
    }

}
