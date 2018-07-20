import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../providers';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  EmailValidators,
  UsernameValidators,
  FirstnameValidators,
  LastnameValidators,
  PasswordValidators
} from '../../../validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  registerForm = new FormGroup({
    //#region email Control
    email: new FormControl('',
      [
        //#region Sync Validators
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(5),
        EmailValidators.isValid,
        //#endregion
      ],
      [
        //#region Async Validators
        EmailValidators.shouldBeUnique(this.authService)
        //#endregion
      ]
    ),
    //#endregion

    //#region username Control
    username: new FormControl('',
      [
        //#region Sync Validators
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(5),
        UsernameValidators.isValid,
        UsernameValidators.cannotContainSpace
        //#endregion
      ],
      [
        //#region Async Validators
        // UsernameValidators.shouldBeUnique(this.authService)
        //#endregion
      ]
    ),
    //#endregion

    //#region firstname Control
    firstname: new FormControl('',
      [
        //#region Sync Validators
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(2),
        FirstnameValidators.isValid,
        FirstnameValidators.cannotContainSpace
        //#endregion
      ],
      [
        //#region Async Validators
        //#endregion
      ]
    ),
    //#endregion

    //#region lastname Control
    lastname: new FormControl('',
      [
        //#region Sync Validators
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(2),
        LastnameValidators.isValid,
        LastnameValidators.cannotContainSpace
        //#endregion
      ],
      [
        //#region Async Validators
        //#endregion
      ]
    ),
    //#endregion

    //#region passwords Group
    passwords: new FormGroup({
      //#region password Control
      password: new FormControl('',
        [
          //#region Sync Validators
          Validators.required,
          Validators.maxLength(35),
          Validators.minLength(8),
          PasswordValidators.isValid,
          LastnameValidators.cannotContainSpace
          //#endregion
        ],
        [
          //#region Async Validators
          //#endregion
        ]
      ),
      //#endregion

      //#region confirm_password Control
      confirm_password: new FormControl('',
        [
          //#region Sync Validators
          Validators.required,
          Validators.maxLength(35),
          Validators.minLength(8),
          PasswordValidators.isValid,
          LastnameValidators.cannotContainSpace
          //#endregion
        ],
        [
          //#region Async Validators
          //#endregion
        ]
      ),
      //#endregion
    }, [
        PasswordValidators.passwordMatch,
      ]),
    //#endregion
  });



  //#region GETS
  get email() {
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }

  get password() {
    return this.registerForm.get('passwords.password');
  }

  get confirm_password() {
    return this.registerForm.get('passwords.confirm_password');
  }

  get passwords() {
    return this.registerForm.get('passwords');
  }
  //#endregion

  register() {
    this.authService.signup({
      email: this.email.value,
      username: this.username.value,
      firstname: this.firstname.value,
      lastname: this.lastname.value,
      password: this.password.value,
    }).subscribe((resp) => {
      if (resp.success) {
        this.router.navigate(['/login']);
      } else {
        this.registerForm.setErrors({
          invalidRegister: true
        });
      }
    });
  }


  ngOnInit() {
  }

}

  // PasswordValidator.areEqual,