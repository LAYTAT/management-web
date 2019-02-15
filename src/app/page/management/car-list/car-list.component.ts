import {Component, Input, OnInit} from '@angular/core';
import {Car, CarName} from '../../../model/car';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../../injectable/service/car.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  @Input()
  name: string;
  @Input()
  carName: CarName;
  pageIndex = 1;
  pageSize = 20;
  total = 1;

  cars: Car[] = [];
  isVisible = false;
  okLoading = false;
  carForm: FormGroup;

  constructor(private carService: CarService) {
    this.carForm = new FormGroup({
      carId: new FormControl(1000000, [Validators.required])
    });
  }

  ngOnInit() {
    this.findAllByCarName();
  }

  handleOk(): void {
    this.okLoading = true;
    const car: Car = {
      carId: this.carForm.get('carId').value
    };
    this.carService.save(car, this.carName).subscribe(
      c => {
        this.cars.unshift(c);
        this.isVisible = false;
        this.okLoading = false;
      }, () => this.okLoading = false
    );
  }

  findAllByCarName(reset: boolean = false): void {
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
