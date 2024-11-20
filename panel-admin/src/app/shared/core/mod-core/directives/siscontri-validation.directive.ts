import {Directive, Input} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {validationRules} from "../constants/function-validation.constants";

@Directive({
  selector: '[sfValidation]',
  providers: [{provide: NG_VALIDATORS, useExisting: SiscontriValidationDirective, multi: true}]
})
export class SiscontriValidationDirective implements Validator {
  @Input() sfValidation: string;

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.sfValidation) {
      return;
    }

    const functionValidation = validationRules.get(this.sfValidation);

    if (!functionValidation) {
      return;
    }

    return functionValidation(control);
  }
}
