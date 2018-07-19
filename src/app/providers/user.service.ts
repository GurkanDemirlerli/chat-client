import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';
import { ServicesHelpers } from './helpers';

@Injectable()
export class UserService {

    domain = server.url + "/";

    constructor(
        private http: Http,
        private socket: Socket
    ) { }


    searchUsersByName(name) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/users/searchUsersByUsername?name=' + name, options).map(res => res.json());
    }

    changeNotificationId(userId, notificationId) {
        return this.http.post(this.domain + 'api/users/changeNotificationId', { userId: userId, notificationId: notificationId }).map(res => res.json());
    }

    deleteNotificationId(userId) {
        console.log(userId);
        return this.http.post(this.domain + 'api/users/deleteNotificationId', { userId: userId }).map(res => res.json());
    }

}
