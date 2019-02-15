import {Component, OnInit} from '@angular/core';
import {Car} from '../../../model/car';
import {CarService} from '../../../injectable/service/car.service';

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
