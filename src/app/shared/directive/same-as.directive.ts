import { Directive, Input } from '@angular/core';
import { Customvalidators } from '../validators/functionx';
import {
  Validator,
  NG_VALIDATORS,
  FormGroup,
  ValidationErrors,
  FormControl,
} from '@angular/forms';

@Directive({
  selector: '[appSameAs]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SameAsDirective,
      multi: true,
    },
  ],
})
export class SameAsDirective implements Validator {
  constructor(private customvalidators: Customvalidators) {}

  @Input('appSameAs') controls!: string[];

  validate(control: FormGroup): ValidationErrors | null {
    console.log('control', control.value);
    console.log('controls', this.controls);

    let x =
      this.controls && this.controls.length === 2
        ? this.customvalidators.sameAsValidator(this.controls)(control)
        : null;
    console.log(x);
    return x;
  }
}
