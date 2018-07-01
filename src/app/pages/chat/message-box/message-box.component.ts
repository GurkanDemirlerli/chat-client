import { Socket } from 'ng-socket-io';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MessageService, UserService } from '../../../providers';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
    private _activatedFriend = '';
    friend;
    messages = [];
    @Input()
    set activatedFriend(activatedFriend: string) {
        this._activatedFriend = activatedFriend;
        this.messageService.getMessagesBetweenMyFriend(this._activatedFriend).subscribe((messages) => {
            this.messages = messages.data;
            console.log(this.friend);
        });
    }

    get activatedFriend(): string { return this._activatedFriend };

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
