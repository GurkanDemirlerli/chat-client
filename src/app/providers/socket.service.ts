import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Socket } from 'ng-socket-io';
import { server } from '../../environments/environment';

@Injectable()
export class SocketService {

    domain = server.url + "/";

    constructor(
        private socket: Socket
    ) { }

    //serverden gelen cevaba göre if yap
    public connect() {
        if (localStorage.getItem("token")) {
            this.socket.connect();
            this.socket.emit('storeClientInfo', localStorage.getItem("token"));
        }
    }
    
}
