import {Component, Input, OnInit} from '@angular/core';
import {Car, CarName} from '../../shared/model/car';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../shared/service/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 20;
  total = 1;

  cars: Car[] = [];
  isVisible = false;
  okLoading = false;
  carForm: FormGroup;

  @Input()
  carName: CarName;
  @Input()
  name: string;

  constructor(private carService: CarService) {
    this.carForm = new FormGroup({
      carId: new FormControl(1000000, [Validators.required])
    });
  }

  ngOnInit() {
    this.findAllByCarName(this.carName);
  }

  handleOk(): void {
    this.okLoading = true;
    const car: Car = {
      carId: this.carForm.get('carId').value
    };
    this.carService.save(car, this.carName).subscribe(
      c => {
        this.cars.unshift(c);
        this.cars = this.cars.slice();
        this.isVisible = false;
        this.okLoading = false;
      }, () => this.okLoading = false
    );
  }

  findAllByCarName(carName: string, reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.carService.findAllByCarName(this.carName,
      this.pageIndex, this.pageSize, 'carId,desc')
      .subscribe(
        page => {
          this.cars = page.content;
          this.total = page.totalElements;
        }
      );
  }
}
