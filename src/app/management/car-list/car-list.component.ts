import {Component, Input, OnInit} from '@angular/core';
import {Car, CarName} from '../../shared/entity/car';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../shared/service/car.service';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  searchTerms = new BehaviorSubject<string>('');

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
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(
      () => {
        this.findAll();
      }
    );
  }

  addCar(): void {
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

  findAll(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.carService.findAll(this.carName, this.searchTerms.getValue(),
      this.pageIndex, this.pageSize, 'carId,desc')
      .subscribe(
        page => {
          this.cars = page.content;
          this.total = page.totalElements;
        }
      );
  }
}
