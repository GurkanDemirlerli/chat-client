import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';
import { ServicesHelpers } from './helpers';

@Injectable()
export class MessageService {

    domain = server.url + "/";

    constructor(
        private http: Http,
        private socket: Socket
    ) { }

    add(message) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.post(this.domain + 'api/messages/add', message, options).map(res => res.json());
    }

    listChat(friendId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/messages/listChat/' + friendId, options).map(res => res.json());
    }

    makeChatMessagesReaded(friendId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/messages/makeChatMessagesReaded/' + friendId, options).map(res => res.json());
    }
}
