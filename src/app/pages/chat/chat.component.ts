import { AuthService } from './../../providers';
import { Socket } from 'ng-socket-io';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  email;
  input = "";
  messages = [];

  drogbaPicture = "http://img2.cdn.turkiyegazetesi.com.tr/images/Resources/2014/5/10/700x155282_drogba_1.jpg";
  messiPicture = "http://www.kimnereli.net/wp-content/uploads/Messi-310x250.jpg";

  constructor(private socket: Socket, private authService: AuthService) {
    this.email = localStorage.getItem('email');

    this.test().subscribe(data => {
      console.log(data);
    });

    this.getMessages().subscribe(message => {
      console.log(message);
      this.messages.push(message);
    });
  }


  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('receiveSignal', data => {
        observer.next(data);
      });
    });
    return observable;
  }

  test() {
    let observable = new Observable(observer => {
      this.socket.on('onlineFriends', data => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendMessage() {
    if (this.input.substr(0, 3) == "/w ") {
      this.input = this.input.replace("/w ", "");
      let array = this.input.split(' ');
      let message = array[1];
      let users = array[0].split(',');
      console.log("users :", users);
      console.log("message : ", message);
      console.log("from :", this.email);
      this.socket.emit('sendSignalToSubscribers', { users: users, message: message, from: this.email });
      this.input = "";
    }
  }

  ngOnInit() {
  }

}
