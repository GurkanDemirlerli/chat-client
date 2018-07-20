import { AuthService } from './../providers/auth.service';
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { ValidatorsBase } from './validators.base';

export class UsernameValidators extends ValidatorsBase {

    static isValid(control: AbstractControl): ValidationErrors | null {
        const re = /^[a-zA-Z0-9]+$/.test(control.value);

        if (re) {
            return null;
        }
        return {
            isValid: true
        };
    }
}