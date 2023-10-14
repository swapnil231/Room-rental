import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstletter',
})
export class FirstletterPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    // let str:string = 'hello';
    if (!value || typeof value !== 'string') {
      return null;
    } else {
      return value[0].toUpperCase() + value.slice(1);
    }

    // return null;
    // if (!value || typeof value !== 'string') {
    //   return '';
    // } else
    //   return value
    //     .split('')
    //     .map((value) => {
    //       return value[0].toUpperCase();
    //     })
    //     .join('');
  }
}
