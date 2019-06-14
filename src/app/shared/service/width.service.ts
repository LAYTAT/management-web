import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidthService {

  constructor() {
  }

  private _width = 0;

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }
}
