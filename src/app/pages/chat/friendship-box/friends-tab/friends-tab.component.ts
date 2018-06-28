import { AuthService } from '../../../../providers';
import { Socket } from 'ng-socket-io';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-friends-tab',
    templateUrl: './friends-tab.component.html',
    styleUrls: ['./friends-tab.component.css']
})
export class FriendsTabComponent implements OnInit {


    drogbaPicture = "http://img2.cdn.turkiyegazetesi.com.tr/images/Resources/2014/5/10/700x155282_drogba_1.jpg";
    messiPicture = "http://www.kimnereli.net/wp-content/uploads/Messi-310x250.jpg";

    constructor(private socket: Socket, private authService: AuthService) {

    }


    ngOnInit() {
    }

}
