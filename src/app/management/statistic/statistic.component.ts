import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  single = [
    {
      'name': 'Germany',
      'value': 40632
    },
    {
      'name': 'United States',
      'value': 49737
    },
    {
      'name': 'France',
      'value': 36745
    },
    {
      'name': 'United Kingdom',
      'value': 36240
    },
    {
      'name': 'Spain',
      'value': 33000
    },
    {
      'name': 'Italy',
      'value': 35800
    }
  ];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
  }

  ngOnInit() {
  }

  onSelect(event) {
    console.log(event);
  }
}
