import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
// import { Moment } from 'moment';

@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  transform(value?: string): string {
    // return null;
    let dateformat = 'YYYY/MM/DD';
    if (!value || typeof value !== 'string') {
      return '';
    }
    return moment(value).format(dateformat);
  }
}
