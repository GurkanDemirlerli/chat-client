import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';
import { ServicesHelpers } from './helpers';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {

    private domain = server.url + "/";

    constructor(
        private http: Http,
        private socket: Socket
    ) { }

    public add(message) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.post(this.domain + 'api/messages/add', message, options).map(res => res.json());
    }

    public listChat(friendId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/messages/listChat/' + friendId, options).map(res => res.json());
    }

    public makeChatMessagesReaded(friendId) {
        let options = ServicesHelpers.createAuthenticationHeader();
        return this.http.get(this.domain + 'api/messages/makeChatMessagesReaded/' + friendId, options).map(res => res.json());
    }

    public observeIsRead() {
        let observable = new Observable(observer => {
            this.socket.on('messagesReaded', data => {
                observer.next(data);
            });
        });
        return observable;
    }

    public observeReceivingMessages() {
        let observable = new Observable(observer => {
            this.socket.on('receiveMessage', data => {
                observer.next(data);
            });
        });
        return observable;
    }
}
