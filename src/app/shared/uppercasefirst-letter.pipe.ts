import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercasefirstLetter',
})
export class UppercasefirstLetterPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (!value || typeof value !== 'string') {
      return '';
    } else
      return value
        .split('')
        .map((value) => {
          return value[0].toUpperCase();
        })
        .join('');
  }
}
