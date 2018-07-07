import { AuthService } from './../providers/auth.service';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Injectable } from '@angular/core';

@Injectable()
export class EmailValidators {

    static shouldBeUnique(authService: AuthService) {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise((resolve, reject) => {
                authService.controlUniquenessForEmail(control.value).subscribe((res) => {
                    console.log(res);
                    if (res.success) {
                        resolve(null);
                    } else {
                        resolve({ emailTaken: true });
                    }
                }, (err) => {
                    // resolve({ shouldBeUnique: true });
                });
            });
        }
    }
}