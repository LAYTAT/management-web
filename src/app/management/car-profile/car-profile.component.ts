import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../shared/service/car.service';
import {Car} from '../../shared/model/car';

@Component({
  selector: 'app-car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.css']
})
export class CarProfileComponent implements OnInit {

  @Input()
  carId: number;
  car: Car;
  carForm: FormGroup;
  loading = false;

  constructor(private carService: CarService) {
    this.carForm = new FormGroup({
      liveUrl: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getCar();
  }

  getCar(): void {
    this.carService.findByCarId(this.carId).subscribe(
      car => {
        this.car = car;
        this.carForm.get('liveUrl').setValue(car.liveUrl);
      }
    );
  }

  onSubmit(): void {
    this.loading = true;
    this.carService.updateLiveUrl(
      this.car.carId,
      this.carForm.get('liveUrl').value
    ).subscribe(
      () => {
        this.loading = false;
      },
      () => this.loading = false
    );
  }
}
