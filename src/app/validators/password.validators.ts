import { AbstractControl, ValidationErrors } from "@angular/forms";
import { ValidatorsBase } from './validators.base';

export class PasswordValidators extends ValidatorsBase {

    static isValid(control: AbstractControl): ValidationErrors | null {
        const re = /^[a-zA-Z0-9]+$/.test(control.value);//degistir

        if (re) {
            return null;
        }
        return {
            isValid: true
        };
    }

    static passwordMatch(c: AbstractControl): ValidationErrors | null {
        if (c.get('password').value !== c.get('confirm_password').value) {
            return { passwordMatch: true };
        }
        return null;
    }

    // static shouldBeUnique(authService: AuthService) {
    //     return (control: AbstractControl): Promise<ValidationErrors | null> => {
    //         return new Promise((resolve, reject) => {
    //             authService.controlUniquenessForEmail(control.value).subscribe((res) => {
    //                 console.log(res);
    //                 if (res.success) {
    //                     resolve(null);
    //                 } else {
    //                     resolve({ emailTaken: true });
    //                 }
    //             }, (err) => {
    //                 // resolve({ shouldBeUnique: true });
    //             });
    //         });
    //     }
    // }
}