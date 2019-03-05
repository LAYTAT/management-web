import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {distinctUntilChanged, filter, map, pairwise, throttleTime} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

enum Direction {
  Up,
  Down
}

@Component({
  selector: 'app-home',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  animations: [
    trigger('toggle', [
      state(
        'open',
        style({opacity: 1, transform: 'translateY(0)'})
      ),
      state(
        'closed',
        style({opacity: 0, transform: 'translateY(-100%)'})
      ),
      transition('open => closed', animate('200ms ease-in')),
      transition('closed => open', animate('200ms ease-out'))
    ])
  ]
})

export class ManagementComponent implements OnInit {
  visibleHeader = true;
  isCollapsed = false;

  constructor() {
  }

  ngOnInit(): void {
    this.getScroll$()
      .subscribe(
        direction => {
          if (direction === Direction.Up) {
            this.visibleHeader = true;
          } else if (direction === Direction.Down) {
            this.visibleHeader = false;
          }
        }
      );
  }

  private getScroll$(): Observable<Direction> {
    return fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      filter(y => y > 50),
      pairwise(),
      map(([y1, y2]): Direction => y1 < y2 ? Direction.Down : Direction.Up),
      distinctUntilChanged(),
    );
  }
}
