import { AfterViewInit, Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Customvalidators } from '../validators/functionx';
import { ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[appForbiddenemail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenemailDirective,
      multi: true,
    },
  ],
})
export class ForbiddenemailDirective implements Validator {
  @Input('appForbiddenemail') forbiddenEmail!: string;

  constructor(private customvalidators: Customvalidators) {}

  validate(control: AbstractControl): {
    [key: string]: any;
  } | null {
    return this.forbiddenEmail
      ? this.customvalidators.forbiddenEmailValidator(this.forbiddenEmail)(
          control
        )
      : null;
  }
}
