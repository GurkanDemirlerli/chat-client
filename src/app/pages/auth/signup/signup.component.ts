import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpaceValidators, PasswordValidator, EmailValidators } from '../../../validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // email = "";
  // password = "";
  // name = "";
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  registerForm = new FormGroup({

    email: new FormControl('', [
      // Validators.compose([
      Validators.required,
      // Validators.minLength(10),
      // Validators.maxLength(30),
      Validators.email,//degistir
      // ])
    ], EmailValidators.shouldBeUnique(this.authService)),
    name: new FormControl('', [
      // Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      SpaceValidators.cannotContainSpace
      // ])
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      PasswordValidator.areEqual,
      SpaceValidators.cannotContainSpace
    ])
  });

  get email() {
    return this.registerForm.get('email');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get telephone() {
    return this.registerForm.get('telephone');
  }

  tete(){
    console.log(this.registerForm.get('email'));
  }



  register() {
    console.log(this.registerForm.value);
    this.authService.registerUser(this.registerForm.value).subscribe((resp) => {
      if (resp.success) {
        this.router.navigate(['/login']);
        console.log('KAYIT BAŞARILI');
      } else {
        this.registerForm.setErrors({
          invalidRegister: true
        });
        console.log('KAYIT OLUNAMADI');
      }
    });
  }


  ngOnInit() {
  }

}
