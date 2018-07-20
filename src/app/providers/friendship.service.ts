import { ServicesHelpers } from './helpers';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { server } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendShipService {

    private domain = server.url + "/";
    public receivedFriendRequestsCount: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(
        private http: Http,
        private socket: Socket
    ) {
        this.getReceivedFriendRequestsCount().subscribe((data) => {
            this.emitReceivedFriendRequestsCount(data.data);
        });
        this.observeReceivedFriendRequestsCount();
    }

    public emitReceivedFriendRequestsCount(newValue) {
        this.receivedFriendRequestsCount.next(newValue);
    }

    private observeReceivedFriendRequestsCount() {
        this.socket.on('receiveFriendShipRequest', data => {
            this.emitReceivedFriendRequestsCount(this.receivedFriendRequestsCount.value + data);
        });
    }

    public sendFriendShipRequest(userId) {
        const body = {
            receiver: userId
        }
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.post(this.domain + 'api/friendship/sendFriendShipRequest', body, options).map(res => res.json());
    }

    public acceptFriendShipRequest(friendShipRequestId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/accept' + "/" + friendShipRequestId, options).map(res => res.json());
    }

    public rejectFriendShipRequest(friendShipRequestId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/reject' + "/" + friendShipRequestId, options).map(res => res.json());
    }

    public cancelSendedFriendShipRequest(friendShipRequestId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/cancel' + "/" + friendShipRequestId, options).map(res => res.json());
    }

    public getReceivedFriendRequestsCount() {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/getReceivedRequestCount', options).map(res => res.json());
    }

    public getSendedRequests() {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/listSendedRequests', options).map(res => res.json());
    }

    public getReceivedRequests() {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/listReceivedRequests', options).map(res => res.json());
    }

    public listFriends() {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/friendship/listFriends', options).map(res => res.json());
    }

    // remove() {

    // }

    public findMyFriend(friendId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/users/findFriend/' + friendId, options).map(res => res.json());
    }

    public observeBeingOnline() {
        let observable = new Observable(observer => {
            this.socket.on('beingOnline', data => {
                observer.next(data);
            });
        });
        return observable;
    }

    public observeBeingOffline() {
        let observable = new Observable(observer => {
            this.socket.on('beingOffline', data => {
                observer.next(data);
            });
        });
        return observable;
    }

    public observeUnreadMessages() {
        let observable = new Observable(observer => {
            this.socket.on('receiveMessage', data => {
                observer.next(data);
            });
        });
        return observable;
    }
}
