import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { server } from '../../environments/environment';

@Injectable()
export class FriendShipService {

    domain = server.url + "/";
    authToken;
    options;

    constructor(
        private http: Http,
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
    sendFriendShipRequest(userId) {
        const body = {
            receiver: userId
        }
        this.createAuthenticationHeaders();
        return this.http.post(this.domain + 'api/friendship/sendFriendShipRequest', body, this.options).map(res => res.json());
    }

    acceptFriendShipRequest(friendShipRequestId) {
        const body = {
            friendShipRequestId: friendShipRequestId
        }
        this.createAuthenticationHeaders();
        return this.http.post(this.domain + 'api/friendship/acceptFriendShipRequest', body, this.options).map(res => res.json());
    }
    rejectFriendShipRequest(friendShipRequestId) {
        const body = {
            friendShipRequestId: friendShipRequestId
        }
        this.createAuthenticationHeaders();
        return this.http.post(this.domain + 'api/friendship/rejectFriendShipRequest', body, this.options).map(res => res.json());
    }

    cancelSendedFriendShipRequest(friendShipRequestId) {
        const body = {
            friendShipRequestId: friendShipRequestId
        }
        this.createAuthenticationHeaders();
        return this.http.post(this.domain + 'api/friendship/cancelSendedFriendShipRequest', body, this.options).map(res => res.json());
    }

}
