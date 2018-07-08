import { AbstractControl, ValidationErrors } from "@angular/forms";
import { ValidatorsBase } from './validators.base';

export class FirstnameValidators extends ValidatorsBase {

    static isValid(control: AbstractControl): ValidationErrors | null {
        const re = /^[a-zA-Z]+$/.test(control.value);

        if (re) {
            return null;
        }
        return {
            isValid: true
        };
    }
}