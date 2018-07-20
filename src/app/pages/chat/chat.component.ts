import { AuthService } from './../../providers';
import { Socket } from 'ng-socket-io';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Output() activatedFriendOutput = new EventEmitter();
  activatedFriend = "";

  constructor() {
  }

  changeActivatedFriend(friend) {
    this.activatedFriend = friend;
    this.activatedFriendOutput.emit(friend);
  }

  ngOnInit() {
  }

}
