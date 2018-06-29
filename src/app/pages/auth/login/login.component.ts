import { Socket } from 'ng-socket-io';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocketService } from '../../../providers';

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
    private socketService: SocketService
  ) { }

  connect() {
    const user = {
      email: this.email,
      password: this.password
    };
    this.authService.login(user).subscribe(async (resp) => {
      await this.authService.storeUserData(resp.data.email, resp.data.id, resp.data.token);
      await this.socketService.connect();
      this.router.navigate(['/chat']);
    });

  }

  ngOnInit() {
  }
}
