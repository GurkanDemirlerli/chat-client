import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';

@Injectable()
export class LocalNotificationService {

    domain = server.url;
    authToken;
    options;

    constructor(
        private http: Http,
        private socket: Socket
    ) { }

    createAuthenticationHeaders() {
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
        return this.http.get(this.domain + '/api/users/getMyNotifications', this.options).map(res => res.json());
    }

    loadToken() {
        this.authToken = localStorage.getItem('token');
    }

}
