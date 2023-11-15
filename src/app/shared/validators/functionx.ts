import { Injectable } from '@angular/core';
import {
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class Customvalidators {
  forbiddenEmailValidator(email: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control.value === email;
      return forbidden ? { forbiddenEmail: { value: control.value } } : null;
    };
  }

  sameAsValidator(controls: string[]): any {
    return (control: FormGroup): ValidationErrors | null => {
      const firstControl = control.get(controls[0])?.value;
      const secondControl = control.get(controls[1])?.value;

      if (!firstControl || !secondControl) {
        return null;
      }

      return firstControl !== secondControl
        ? { sameAs: { value: control.value } }
        : null;
    };
  }
}
