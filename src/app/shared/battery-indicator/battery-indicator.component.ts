import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-battery-indicator',
  templateUrl: './battery-indicator.component.html',
  styleUrls: ['./battery-indicator.component.css']
})
export class BatteryIndicatorComponent implements OnInit {
  value = 0;

  constructor() {
  }

  ngOnInit() {
    setInterval(() => {
      this.value = Math.random() * 120;
    }, 500);
  }

}
