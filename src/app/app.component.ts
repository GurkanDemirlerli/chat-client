import { SocketService } from './providers';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public socketService: SocketService
  ) {
    this.socketService.connect();
  }
  title = 'app';


}
