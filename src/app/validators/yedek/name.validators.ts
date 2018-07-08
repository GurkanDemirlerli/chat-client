import { AbstractControl, ValidationErrors } from "@angular/forms";

export class NameValidators {
    static cannotContainSpaceMoreThanOne(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).split(' ').length > 2)
            return { cannotContainSpaceMoreThanOne: true };

        return null;

    }

    static cannotContainSpaceAtTheBeginnigOrEnding(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).charAt(0) == ' ' || ((control.value as string).charAt(((control.value as string).length - 1)) == ' '))
            return { cannotContainSpaceAtTheBeginnigOrEnding: true };

        return null;

    }

    static isValid(control: AbstractControl): ValidationErrors | null {
        const re = /^[a-zA-Z ]+$/.test(control.value);
        if (re) {
            return null;
        }
        return {
            isValid: true
        };
    }
}