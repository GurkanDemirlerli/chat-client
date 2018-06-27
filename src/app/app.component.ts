import { Component } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private socket: Socket
  ) {
    this.connect();
  }
  title = 'app';

  connect(){
    if (localStorage.getItem("email")){
      this.socket.connect();
      this.socket.emit('storeClientInfo', localStorage.getItem("email"));
    }
  }
}
