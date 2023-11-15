import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstletter',
})
export class FirstletterPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value || typeof value !== 'string') {
      return null;
    } else {
      return value[0].toUpperCase() + value.slice(1);
    }
  }
}
