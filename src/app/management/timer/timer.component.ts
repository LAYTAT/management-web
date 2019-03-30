import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnChanges {
  @Input()
  title: string;
  @Input()
  initialTime: number;
  @Input()
  paused = true;

  elapsedTime = 0;

  constructor() {
  }

  ngOnInit() {
    setInterval(() => {
      if (!this.paused) {
        this.elapsedTime += 1000;
      }
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.initialTime) {
      this.elapsedTime = this.initialTime;
    }
    if (changes.paused) {
      this.paused = changes.paused.currentValue;
    }
  }
}
