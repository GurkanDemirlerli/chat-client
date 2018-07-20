import { ServicesHelpers } from './helpers';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { server } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Socket } from 'ng-socket-io';

@Injectable()
export class FriendShipService {

    private domain = server.url + "/";

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

    observeReceivedFriendRequestsCount() {
        this.socket.on('receiveFriendShipRequest', data => {
            this.emitReceivedFriendRequestsCount(this.receivedFriendRequestsCount.value + data);
        });
    }

    sendFriendShipRequest(userId) {
        const body = {
            receiver: userId
        }
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.post(this.domain + 'api/friendship/sendFriendShipRequest', body, options).map(res => res.json());
    }

    acceptFriendShipRequest(friendShipRequestId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/accept' + "/" + friendShipRequestId, options).map(res => res.json());
    }

    rejectFriendShipRequest(friendShipRequestId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/reject' + "/" + friendShipRequestId, options).map(res => res.json());
    }

    cancelSendedFriendShipRequest(friendShipRequestId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/cancel' + "/" + friendShipRequestId, options).map(res => res.json());
    }

    getReceivedFriendRequestsCount() {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/getReceivedRequestCount', options).map(res => res.json());
    }

    getSendedRequests() {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/listSendedRequests', options).map(res => res.json());
    }

    getReceivedRequests() {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/listReceivedRequests', options).map(res => res.json());
    }

    listFriends() {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/listFriends', options).map(res => res.json());
    }

    // remove() {

    // }

    findMyFriend(friendId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/users/findFriend/' + friendId, options).map(res => res.json());
    }
}
