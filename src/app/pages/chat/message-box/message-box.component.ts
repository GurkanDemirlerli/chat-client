import { Socket } from 'ng-socket-io';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MessageService, UserService } from '../../../providers';
import { ActivatedFriendModel } from '../../../models';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
    private _activatedFriend: ActivatedFriendModel;
    drogbaPicture = "http://img2.cdn.turkiyegazetesi.com.tr/images/Resources/2014/5/10/700x155282_drogba_1.jpg";
    friend;
    messages = [];
    input = "";
    @Input()
    set activatedFriend(activatedFriend) {
        if (activatedFriend) {
            this._activatedFriend = activatedFriend;
            this.messageService.getMessagesBetweenMyFriend(this._activatedFriend._id).subscribe((messages) => {
                this.messages = messages.data;
            });
            this.messageService.makeAllReceivedMessagesReadedFromMyFriend(activatedFriend._id).subscribe((res) => {

            });
        }
    }

    get activatedFriend() { return this._activatedFriend };

    constructor(
        private socket: Socket,
        private userService: UserService,
        private messageService: MessageService
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
                        this.messageService.makeAllReceivedMessagesReadedFromMyFriend(this._activatedFriend._id).subscribe((res) => {
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
            content: this.input
        }
        this.messageService.createMessage(message).subscribe((res) => {
            // console.log(res.data);
            this.messages.push(res.data);
        });
        this.input = "";
    }



    ngOnInit() {

    }

}
