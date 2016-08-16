import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toJsDate'})
export class LocalDateTimeToDate implements PipeTransform {
  transform(value:any):Date {
    var year = value['year'];
    var month = value['monthValue'] - 1;
    var day = value['dayOfMonth'];
    var hour = value['hour'];
    var minute = value['minute'];
    return new Date(year, month, day, hour, minute, 0, 0);
  }
}
