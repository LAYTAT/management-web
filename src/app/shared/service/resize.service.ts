import {Injectable} from '@angular/core';
import {fromEvent} from 'rxjs';
import {map, throttleTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {
  private readonly _width$;

  constructor() {
    this._width$ = fromEvent(window, 'resize').pipe(
      throttleTime(100),
      map(() => window.innerWidth)
    );
  }

  get width$() {
    return this._width$;
  }
}
