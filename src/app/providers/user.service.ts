import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { server } from '../../environments/environment';
import { ServicesHelpers } from './helpers';

@Injectable()
export class UserService {

    private domain = server.url + "/";

    constructor(
        private http: Http,
    ) { }

    public searchUsersByName(username) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/users/searchUsersByUsername?username=' + username + '&limit=20&skip=0', options).map(res => res.json());
    }

    public changeNotificationId(userId, notificationId) {
        return this.http.post(this.domain + 'api/users/changeNotificationId', { userId: userId, notificationId: notificationId }).map(res => res.json());
    }

    public deleteNotificationId(userId) {
        return this.http.post(this.domain + 'api/users/deleteNotificationId', { userId: userId }).map(res => res.json());
    }

}
