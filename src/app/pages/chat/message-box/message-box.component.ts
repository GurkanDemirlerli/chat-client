import { UserService } from './../../../providers/user.service';
import { Socket } from 'ng-socket-io';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
    private _activatedFriend = '';
    @Input()
    set activatedFriend(activatedFriend: string) {
        this._activatedFriend = activatedFriend;
        this.userService.findMyFriend(this._activatedFriend).subscribe((friend) => {
            this.friend = friend;
            console.log(this.friend);
        });
    }

    get activatedFriend(): string { return this._activatedFriend };
    friend;

    constructor(
        private socket: Socket,
        private userService: UserService
    ) {
        // this.userService.findMyFriend(this.activatedFriend).subscribe((friend) => {
        //     this.friend = friend;
        //     console.log(this.friend);
        // });
    }

    ngOnInit() {
    }

}
