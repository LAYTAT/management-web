import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {CarService} from '../../../injectable/service/car.service';
import {Car} from '../../../model/car';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-panel.component.html',
  styleUrls: ['./driver-panel.component.css']
})
export class DriverPanelComponent implements OnInit {
  car: Car;

  constructor(private route: ActivatedRoute,
              private carService: CarService) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.carService.findByCarId(+params.get('id')))
    ).subscribe(car => this.car = car);
  }
}
