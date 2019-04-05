import {Pipe, PipeTransform} from '@angular/core';
import {CarName} from '../model/car';

@Pipe({
  name: 'car'
})
export class CarPipe implements PipeTransform {

  transform(value: CarName): string {
    if (value === CarName.DIGGER) {
      return '挖掘机';
    } else if (value === CarName.PUSHDOZER) {
      return '推土机';
    }
    return null;
  }
}
