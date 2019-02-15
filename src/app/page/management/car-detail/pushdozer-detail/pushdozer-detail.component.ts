import {Component, OnInit} from '@angular/core';
import {Car} from '../../../../model/car';
import {ActivatedRoute} from '@angular/router';
import {CarService} from '../../../../injectable/service/car.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-pushdozer-detail',
  templateUrl: './pushdozer-detail.component.html',
  styleUrls: ['./pushdozer-detail.component.css']
})
export class PushdozerDetailComponent implements OnInit {

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
