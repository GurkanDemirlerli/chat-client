import { AuthService } from '../../../providers';
import { Socket } from 'ng-socket-io';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-friendship-box',
    templateUrl: './friendship-box.component.html',
    styleUrls: ['./friendship-box.component.css']
})
export class FriendShipBoxComponent implements OnInit {
    activeTab = "friends-tab";

    drogbaPicture = "http://img2.cdn.turkiyegazetesi.com.tr/images/Resources/2014/5/10/700x155282_drogba_1.jpg";
    messiPicture = "http://www.kimnereli.net/wp-content/uploads/Messi-310x250.jpg";

    constructor(private socket: Socket, private authService: AuthService) {

    }

    changeTab(clickedTab: string) {
        if (this.activeTab !== clickedTab) {
            this.activeTab = clickedTab;
        }
    }


    ngOnInit() {
    }

}
