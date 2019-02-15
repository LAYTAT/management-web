import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CarService} from '../../../../injectable/service/car.service';
import {switchMap} from 'rxjs/operators';
import {Car} from '../../../../model/car';

@Component({
  selector: 'app-digger-detail',
  templateUrl: './digger-detail.component.html',
  styleUrls: ['./digger-detail.component.css']
})
export class DiggerDetailComponent implements OnInit {

  car: Car;

  constructor(private route: ActivatedRoute,
              private carService: CarService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.carService.findByCarId(+params.get('id')))
    ).subscribe(car => this.car = car);
  }

}
