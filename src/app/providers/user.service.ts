import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';

@Injectable()
export class UserService {

    domain = server.url + "/";
    authToken;
    options;

    constructor(
        private http: Http,
        private socket: Socket
    ) { }

    // Function to create headers, add token, to be used in HTTP requests
    createAuthenticationHeaders() {
        this.loadToken(); // Get token so it can be attached to headers
        // Headers configuration options
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json', // Format set to JSON
                'authorization': this.authToken // Attach token
            })
        });
    }

    loadToken() {
        this.authToken = localStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
    }

    getMyFriends() {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        return this.http.get(this.domain + 'api/users/listMyFriends', this.options).map(res => res.json());
    }

    findMyFriend(friendId) {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        return this.http.get(this.domain + 'api/users/findMyFriend/' + friendId, this.options).map(res => res.json());
    }

    searchUsersByName(name) {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        return this.http.get(this.domain + 'api/users/searchUsersByName?name=' + name, this.options).map(res => res.json());
    }
}
