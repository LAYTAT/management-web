import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-use-ratio-indicator',
  templateUrl: './use-ratio-indicator.component.html',
  styleUrls: ['./use-ratio-indicator.component.css']
})
export class UseRatioIndicatorComponent implements OnInit {

  @Input()
  dimension: number[];
  multi = [
    {
      'name': '负载',
      'series': []
    }
  ];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }

  ngOnInit() {
    setInterval(() => {
      if (this.multi[0].series.length > 15) {
        this.multi[0].series.shift();
      }
      this.multi[0].series.push({
        'value': 80 + Math.random() * 10,
        'name': new Date().toString()
      });
      this.multi = this.multi.slice();
    }, 1000);
  }
}
