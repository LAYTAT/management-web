import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../../shared/model/car';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  @Input()
  car: Car;

  constructor() {
  }

  ngOnInit() {
  }
}
