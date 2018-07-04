import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LocalNotificationService {

    private domain = server.url;
    private authToken;
    private options;
    public unReadedNotificationsCount = new Subject<number>();
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

    public getMylocalNotifications() {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + '/api/users/getMyNotifications', this.options).map(res => res.json());
    }

    private getUnReadedNotificationsCount() {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + '/api/users/getUnReadedNotificationsCount', this.options).map(res => res.json());
    }

    private loadToken() {
        this.authToken = localStorage.getItem('token');
    }

}
