import { ValidationErrors, AbstractControl } from "@angular/forms";
export class EmailValidator{

  static isValid(control:AbstractControl): ValidationErrors | null{
    const re = /^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/.test(control.value);
    
    if(re){
        return null;
    }
    return {
      isValid:true
    };
  }
}