import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../../model/user';
import {CarService} from '../../../../injectable/service/car.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Car} from '../../../../model/car';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit, OnChanges {

  @Input()
  car: Car;
  isVisible = false;
  okLoading = false;
  loading = false;
  drivers: User[] = [];

  driverForm: FormGroup;

  constructor(private carService: CarService) {
    this.driverForm = new FormGroup({
      employeeId: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.car.currentValue) {
      this.drivers = changes.car.currentValue.users;
    }
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
