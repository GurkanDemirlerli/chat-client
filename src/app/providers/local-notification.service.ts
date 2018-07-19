import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocalNotificationService {

    private domain = server.url;
    private authToken;
    private options;
    unReadedNotificationsCount: BehaviorSubject<number> = new BehaviorSubject(0);
    emitUnReadedNotificationsCount(newValue) {
        this.unReadedNotificationsCount.next(newValue);
    }

    constructor(
        private http: Http,
        private socket: Socket
    ) {
        // this.unReadedNotificationsCount.next(0);
        this.getUnReadedNotificationsCount().subscribe((data) => {
            this.emitUnReadedNotificationsCount(data.data);
        });
        this.observeLocalNotifications();
    }

    private createAuthenticationHeaders() {
        this.loadToken();
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': this.authToken
            })
        });
    }

    getMylocalNotifications() {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + '/api/local-notifications/list', this.options).map(res => res.json());
    }

    private getUnReadedNotificationsCount() {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + '/api/local-notifications/unreadedCount', this.options).map(res => res.json());
    }

    private loadToken() {
        this.authToken = localStorage.getItem('token');
    }

    makeAllNotificationsReaded() {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + '/api/local-notifications/makeAllReaded', this.options).map(res => res.json());
    }

    observeLocalNotifications() {
        this.socket.on('receiveLocalNotification', data => {
            // observer.next(data);
            this.emitUnReadedNotificationsCount(this.unReadedNotificationsCount.value + 1);
        });
    }



}
