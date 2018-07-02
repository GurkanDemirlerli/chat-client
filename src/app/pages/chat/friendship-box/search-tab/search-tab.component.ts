import { UserService } from './../../../../providers';
import { AuthService } from '../../../../providers';
import { Socket } from 'ng-socket-io';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-search-tab',
    templateUrl: './search-tab.component.html',
    styleUrls: ['./search-tab.component.css']
})
export class SearchTabComponent implements OnInit {
    searchInput = "ron";
    users;

    constructor(
        private socket: Socket,
        private authService: AuthService,
        private userService: UserService
    ) {

    }

    searchUsers(input) {
        if (input.length > 2) {
            this.userService.searchUsersByName(input).subscribe((users) => {
                this.users = users.data;
                console.log(this.users);
            });
            console.log(input);
        }
    }


    ngOnInit() {
    }

}
