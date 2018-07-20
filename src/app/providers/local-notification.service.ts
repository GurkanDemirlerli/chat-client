import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServicesHelpers } from './helpers';

@Injectable()
export class LocalNotificationService {

    private domain = server.url;
    public unReadedNotificationsCount: BehaviorSubject<number> = new BehaviorSubject(0);

    constructor(
        private http: Http,
        private socket: Socket
    ) {
        this.getUnReadedNotificationsCount().subscribe((data) => {
            this.emitUnReadedNotificationsCount(data.data);
        });
        this.observeLocalNotifications();
    }

    public emitUnReadedNotificationsCount(newValue) {
        this.unReadedNotificationsCount.next(newValue);
    }

    public getMylocalNotifications() {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + '/api/local-notifications/list', options).map(res => res.json());
    }

    private getUnReadedNotificationsCount() {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + '/api/local-notifications/unreadedCount', options).map(res => res.json());
    }

    public makeAllNotificationsReaded() {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + '/api/local-notifications/makeAllReaded', options).map(res => res.json());
    }

    public observeLocalNotifications() {
        this.socket.on('receiveLocalNotification', data => {
            // observer.next(data);
            this.emitUnReadedNotificationsCount(this.unReadedNotificationsCount.value + 1);
        });
    }



}
