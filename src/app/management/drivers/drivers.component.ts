import {Component, Input, OnInit} from '@angular/core';
import {CarService} from '../../shared/service/car.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Car} from '../../shared/model/car';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  @Input()
  carId: number;
  car: Car;
  isVisible = false;
  okLoading = false;
  loading = false;
  drivers = [];

  driverForm: FormGroup;

  constructor(private carService: CarService) {
    this.driverForm = new FormGroup({
      employeeId: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getCar();
  }

  getCar(): void {
    this.carService.findByCarId(this.carId).subscribe(
      car => this.car = car
    );
  }

  handleOk(): void {
    this.okLoading = true;

    const employeeId = this.driverForm.get('employeeId').value;

    this.carService.addDriver(this.car.carId, employeeId).subscribe(
      car => {
        this.drivers = car.users;
        this.isVisible = false;
        this.okLoading = false;
      }, () => this.okLoading = false
    );
  }

  confirm(employeeId: number): void {
    this.okLoading = true;
    this.carService.removeDriver(this.car.carId, employeeId).subscribe(
      car => {
        this.drivers = car.users;
        this.okLoading = false;
      }
    );
  }
}
