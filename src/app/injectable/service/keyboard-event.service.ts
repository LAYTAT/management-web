import {Injectable} from '@angular/core';
import {fromEvent, merge, Observable} from 'rxjs';
import {distinctUntilChanged, filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KeyboardEventService {

  private _keyboardEvent$: Observable<KeyboardEvent>;

  constructor() {
    this._keyboardEvent$ = merge(
      fromEvent<KeyboardEvent>(document, 'keydown'),
      fromEvent<KeyboardEvent>(document, 'keyup'))
      .pipe(
        distinctUntilChanged((x, y) => (x.key === y.key) && (x.type === y.type)),
      );
    this._keydown$ = this._keyboardEvent$.pipe(
      filter(event => event.type === 'keydown'),
    );
    this._keyup$ = this._keyboardEvent$.pipe(
      filter(event => event.type === 'keyup'),
    );
  }

  private readonly _keydown$: Observable<KeyboardEvent>;

  get keydown$(): Observable<KeyboardEvent> {
    return this._keydown$;
  }

  private readonly _keyup$: Observable<KeyboardEvent>;

  get keyup$(): Observable<KeyboardEvent> {
    return this._keyup$;
  }
}
