import { AbstractControl, ValidationErrors } from "@angular/forms";
import { ValidatorsBase } from './validators.base';

export class PasswordValidators extends ValidatorsBase {

    static isValid(control: AbstractControl): ValidationErrors | null {
        const re = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/.test(control.value);//degistir

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

}