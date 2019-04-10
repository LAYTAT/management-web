import {Component, OnInit} from '@angular/core';
import {Car} from '../../shared/entity/car';
import {CarService} from '../../shared/service/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) {
  }

  ngOnInit() {
    this.findAllByDriver();
  }

  findAllByDriver(): void {
    this.carService.findAllByDriver().subscribe(
      cars => this.cars = cars
    );
  }
}
