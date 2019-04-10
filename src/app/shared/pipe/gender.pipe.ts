import {Pipe, PipeTransform} from '@angular/core';
import {Gender} from '../entity/user';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: Gender): string {
    if (value === Gender.Woman) {
      return '女';
    } else if (value === Gender.Man) {
      return '男';
    }
    return null;
  }
}
