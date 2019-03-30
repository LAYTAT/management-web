import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'elapsedTime'
})
export class ElapsedTimePipe implements PipeTransform {

  transform(value: number): string {
    const days = Math.floor(value / 86400000);
    const hours = Math.floor((value % 86400000) / 3600000);
    const minutes = Math.floor(((value % 86400000) % 3600000) / 60000);
    const seconds = Math.floor((value % 60000) / 1000);
    return `${days}天 ${hours}时 ${minutes}分 ${seconds}秒`;
  }
}
