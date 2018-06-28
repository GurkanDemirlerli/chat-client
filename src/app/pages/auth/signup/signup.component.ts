import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email = "";
  password = "";
  name = "";
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  signup() {
    const user = {
      email: this.email,
      password: this.password,
      name: this.name
    };
    this.authService.registerUser(user).subscribe((resp) => {
      // this.authService.storeUserData(resp.data.email, resp.data.id, resp.data.token);
    });
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
