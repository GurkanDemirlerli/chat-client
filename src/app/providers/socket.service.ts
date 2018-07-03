import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';

@Injectable()
export class SocketService {

    // domain = ""; // Production
    domain = server.url + "/";

    constructor(
        private http: Http,
        private socket: Socket
    ) { }

    connect() {
        if (localStorage.getItem("token")) {
            this.socket.connect();
            console.log('storeClientInfoCalisti');
            this.socket.emit('storeClientInfo', localStorage.getItem("token"));
        }
    }
    
}
