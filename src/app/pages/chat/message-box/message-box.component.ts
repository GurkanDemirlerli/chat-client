import { Socket } from 'ng-socket-io';
import { Component, OnInit, Input } from '@angular/core';
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
    @Input()
    set activatedFriend(activatedFriend) {
        if (activatedFriend) {
            this._activatedFriend = activatedFriend;
            this.messageService.getMessagesBetweenMyFriend(this._activatedFriend._id).subscribe((messages) => {
                this.messages = messages.data;
            });
        }
    }

    get activatedFriend() { return this._activatedFriend };

    constructor(
        private socket: Socket,
        private userService: UserService,
        private messageService: MessageService
    ) {
        // this.userService.findMyFriend(this.activatedFriend).subscribe((friend) => {
        //     this.friend = friend;
        //     console.log(this.friend);
        // });
    }

    ngOnInit() {
    }

}
