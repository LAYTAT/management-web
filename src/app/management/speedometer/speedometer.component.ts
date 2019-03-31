import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.css']
})
export class SpeedometerComponent implements OnInit {
  value = 0;

  constructor() {

  }

  ngOnInit(): void {
    setInterval(() => {
      this.value = Math.random() * 60;
    }, 500);
  }
}
