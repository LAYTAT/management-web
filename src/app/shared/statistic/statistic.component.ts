import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  @Input()
  view: number[];
  single = [
    {
      'name': '前1天',
      'value': 10
    },
    {
      'name': '前2天',
      'value': 4
    },
    {
      'name': '前3天',
      'value': 5
    },
    {
      'name': '前4天',
      'value': 7
    },
    {
      'name': '前5天',
      'value': 8
    },
    {
      'name': '前6天',
      'value': 6
    },
    {
      'name': '前7天',
      'value': 6
    }
  ];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }

  ngOnInit() {
  }
}
