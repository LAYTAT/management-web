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
  multi = [
    {
      'name': 'Dominica',
      'series': [
        {
          'value': 4367,
          'name': '2016-09-12T19:23:59.854Z'
        },
        {
          'value': 6421,
          'name': '2016-09-21T10:15:39.064Z'
        },
        {
          'value': 5559,
          'name': '2016-09-17T13:27:03.425Z'
        },
        {
          'value': 4629,
          'name': '2016-09-12T20:45:07.602Z'
        },
        {
          'value': 5229,
          'name': '2016-09-20T15:47:29.725Z'
        }
      ]
    },
    {
      'name': 'Sri Lanka',
      'series': [
        {
          'value': 2600,
          'name': '2016-09-12T19:23:59.854Z'
        },
        {
          'value': 6975,
          'name': '2016-09-21T10:15:39.064Z'
        },
        {
          'value': 6835,
          'name': '2016-09-17T13:27:03.425Z'
        },
        {
          'value': 2856,
          'name': '2016-09-12T20:45:07.602Z'
        },
        {
          'value': 4742,
          'name': '2016-09-20T15:47:29.725Z'
        }
      ]
    },
    {
      'name': 'Falkland Islands (Malvinas)',
      'series': [
        {
          'value': 5136,
          'name': '2016-09-12T19:23:59.854Z'
        },
        {
          'value': 5583,
          'name': '2016-09-21T10:15:39.064Z'
        },
        {
          'value': 5334,
          'name': '2016-09-17T13:27:03.425Z'
        },
        {
          'value': 3809,
          'name': '2016-09-12T20:45:07.602Z'
        },
        {
          'value': 4602,
          'name': '2016-09-20T15:47:29.725Z'
        }
      ]
    },
    {
      'name': 'Afghanistan',
      'series': [
        {
          'value': 3899,
          'name': '2016-09-12T19:23:59.854Z'
        },
        {
          'value': 6093,
          'name': '2016-09-21T10:15:39.064Z'
        },
        {
          'value': 4631,
          'name': '2016-09-17T13:27:03.425Z'
        },
        {
          'value': 4382,
          'name': '2016-09-12T20:45:07.602Z'
        },
        {
          'value': 3642,
          'name': '2016-09-20T15:47:29.725Z'
        }
      ]
    },
    {
      'name': 'Trinidad and Tobago',
      'series': [
        {
          'value': 6161,
          'name': '2016-09-12T19:23:59.854Z'
        },
        {
          'value': 3108,
          'name': '2016-09-21T10:15:39.064Z'
        },
        {
          'value': 5403,
          'name': '2016-09-17T13:27:03.425Z'
        },
        {
          'value': 3808,
          'name': '2016-09-12T20:45:07.602Z'
        },
        {
          'value': 2319,
          'name': '2016-09-20T15:47:29.725Z'
        }
      ]
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
