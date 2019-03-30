import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../../shared/model/car';
import {AuthService} from '../../shared/service/auth.service';
import {CarService} from '../../shared/service/car.service';
import {User} from '../../shared/model/user';

@Component({
  selector: 'app-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit {
  @Input()
  carId: number;
  car: Car;
  currentUser: User;
  runningTime = 0;

  constructor(private authService: AuthService,
              private carService: CarService) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getCar();
  }

  getCurrentUser(): void {
    this.currentUser = this.authService.currentUser;
  }

  getCar(): void {
    this.carService.findByCarId(this.carId).subscribe(
      car => {
        this.car = car;
        this.runningTime = new Date().getTime() - this.car.startDate;
      }
    );
  }

  startDrive() {
    this.carService.startDrive(this.car.carId, this.currentUser.employeeId).subscribe(
      car => this.car = car
    );
  }

  finishDrive() {
    this.carService.finishDrive(this.car.carId).subscribe(
      car => this.car = car
    );
  }
}
