import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Car} from '../../shared/model/car';
import {CarService} from '../../shared/service/car.service';

@Component({
  selector: 'app-car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.css']
})
export class CarProfileComponent implements OnInit, OnChanges {

  @Input()
  car: Car;

  carForm: FormGroup;
  loading = false;

  constructor(private carService: CarService) {
    this.carForm = new FormGroup({
      liveUrl: new FormControl('', [Validators.required])
    })
    ;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.car.currentValue) {
      this.carForm.get('liveUrl').setValue(changes.car.currentValue.liveUrl);
    }
  }

  onSubmit(): void {
    this.loading = true;
    this.carService.updateByCarId(this.car.carId,
      {
        liveUrl: this.carForm.get('liveUrl').value
      }).subscribe(
      () => {
        this.loading = false;
      },
      () => this.loading = false
    );
  }
}
