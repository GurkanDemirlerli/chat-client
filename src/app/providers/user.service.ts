import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';
import { ServicesHelpers } from './helpers';

@Injectable()
export class UserService {

    private domain = server.url + "/";

    constructor(
        private http: Http,
    ) { }
 
    public searchUsersByName(name) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/users/searchUsersByUsername?name=' + name, options).map(res => res.json());
    }

    public changeNotificationId(userId, notificationId) {
        return this.http.post(this.domain + 'api/users/changeNotificationId', { userId: userId, notificationId: notificationId }).map(res => res.json());
    }

    public deleteNotificationId(userId) {
        return this.http.post(this.domain + 'api/users/deleteNotificationId', { userId: userId }).map(res => res.json());
    }

}
