import { Directive, Input } from '@angular/core';
import { Customvalidators } from '../validators/functionx';
import {
  Validator,
  NG_VALIDATORS,
  FormGroup,
  ValidationErrors,
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
    const x =
      this.controls && this.controls.length === 2
        ? this.customvalidators.sameAsValidator(this.controls)(control)
        : null;

    return x;
  }
}
