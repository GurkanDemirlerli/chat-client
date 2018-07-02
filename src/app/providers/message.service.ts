import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';

@Injectable()
export class MessageService {

    domain = "http://localhost:1923/";
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

    getMessagesBetweenMyFriend(friendId) {
        this.createAuthenticationHeaders(); // Create headers before sending to API
        return this.http.get(this.domain + 'api/users/getMessagesBetweenMyFriend/' + friendId, this.options).map(res => res.json());
    }

    loadToken() {
        this.authToken = localStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
    }

    createMessage(message) {
        this.createAuthenticationHeaders();
        return this.http.post(this.domain + 'api/messages/add', message, this.options).map(res => res.json());
    }
}
