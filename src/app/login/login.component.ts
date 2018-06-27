import { Socket } from 'ng-socket-io';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private socket: Socket
  ) { }

  connect() {
    this.socket.connect();
    console.log(this.email);
    const user = {
      email: this.email,
      password: this.password
    };
    this.authService.login(user).subscribe((resp) => {
      this.authService.storeUserData(resp.data.email, resp.data.id, resp.data.token);
      this.socket.connect();
      this.socket.emit('storeClientInfo', this.email);
      this.router.navigate(['/chat']);
    });

  }

  ngOnInit() {
  }
}
