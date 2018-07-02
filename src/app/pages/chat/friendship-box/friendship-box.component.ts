import { MyProfileCardModel } from './../../../models';
import { AuthService } from '../../../providers';
import { Socket } from 'ng-socket-io';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-friendship-box',
    templateUrl: './friendship-box.component.html',
    styleUrls: ['./friendship-box.component.css']
})
export class FriendShipBoxComponent implements OnInit {
    @Output() activatedFriendOutput = new EventEmitter();
    activeTab = "friends-tab";
    myProfileCard: MyProfileCardModel;

    drogbaPicture = "http://img2.cdn.turkiyegazetesi.com.tr/images/Resources/2014/5/10/700x155282_drogba_1.jpg";
    messiPicture = "http://www.kimnereli.net/wp-content/uploads/Messi-310x250.jpg";

    constructor(private socket: Socket, private authService: AuthService) {
        this.authService.getMyProfileCard().subscribe((myProfileCard) => {
            this.myProfileCard = myProfileCard.data;
        });
    }

    changeTab(clickedTab: string) {
        if (this.activeTab !== clickedTab) {
            this.activeTab = clickedTab;
        }
    }

    changeActivatedFriend(friend) {
        console.log(friend);
        this.activatedFriendOutput.emit(friend);
    }


    ngOnInit() {
    }

}
