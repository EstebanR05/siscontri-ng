import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";

const notNullFunction = (control: AbstractControl) : ValidationErrors => {
  return Validators.required(control);
};

const emailFunction = (control: AbstractControl) : ValidationErrors => {
  return Validators.email(control);
};

const validationRules: Map<string, Function> = new Map([
  ["notNull", notNullFunction],
  ["email", emailFunction]
]);

export {
  validationRules
}
