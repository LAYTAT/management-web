import {Component, OnDestroy, OnInit} from '@angular/core';
import {WidthService} from '../service/width.service';

@Component({
  selector: 'app-use-ratio-indicator',
  templateUrl: './use-ratio-indicator.component.html',
  styleUrls: ['./use-ratio-indicator.component.css']
})
export class UseRatioIndicatorComponent implements OnInit, OnDestroy {

  multi = [
    {
      'name': '负载',
      'series': []
    }
  ];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  timer;

  constructor(public widthService: WidthService) {
  }

  ngOnInit() {
    this.timer = setInterval(() => {
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

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
