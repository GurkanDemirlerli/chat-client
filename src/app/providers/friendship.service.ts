import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { server } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Socket } from 'ng-socket-io';

@Injectable()
export class FriendShipService {

    private domain = server.url + "/";
    private authToken;
    private options;

    receivedFriendRequestsCount: BehaviorSubject<number> = new BehaviorSubject(0);
    emitReceivedFriendRequestsCount(newValue) {
        this.receivedFriendRequestsCount.next(newValue);
    }

    constructor(
        private http: Http,
        private socket: Socket
    ) {
        this.getReceivedFriendRequestsCount().subscribe((data) => {
            this.emitReceivedFriendRequestsCount(data.data);
        });
        this.observeReceivedFriendRequestsCount();
    }

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

    getReceivedFriendRequestsCount() {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'api/friendship/getReceivedFriendRequestsCount', this.options).map(res => res.json());
    }

    observeReceivedFriendRequestsCount() {
        this.socket.on('receiveFriendShipRequest', data => {
            // observer.next(data);
            this.emitReceivedFriendRequestsCount(this.receivedFriendRequestsCount.value + data);
        });
    }

    getMyAllFriendShipRequests() {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'api/friendship/getMyAllFriendShipRequests', this.options).map(res => res.json());
    }

}
