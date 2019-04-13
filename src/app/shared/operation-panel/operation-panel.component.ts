import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Car} from '../entity/car';
import {AuthService} from '../service/auth.service';
import {CarService} from '../service/car.service';
import {User} from '../entity/user';
import {BigScreenService} from 'angular-bigscreen';

@Component({
  selector: 'app-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit, OnChanges {
  @ViewChild('mainContainer')
  mainContainerRef: ElementRef;
  mainContainer: HTMLElement;
  @Input()
  carId: number;
  car: Car;
  currentUser: User;
  runningTime = 0;
  available = false;

  constructor(private authService: AuthService,
              private carService: CarService,
              private bigScreenService: BigScreenService) {
  }

  ngOnInit() {
    this.mainContainer = this.mainContainerRef.nativeElement;
    this.getCurrentUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.carId.currentValue) {
      this.getCar();
    }
  }

  getCurrentUser(): void {
    this.currentUser = this.authService.currentUser;
  }

  getCar(): void {
    this.carService.findByCarId(this.carId).subscribe(
      car => {
        this.car = car;
        if (car.startDate) {
          this.runningTime = new Date().getTime() - car.startDate;
        }
        this.available = !this.car.currentDriver ||
          this.car.currentDriver.employeeId === this.currentUser.employeeId;
      }
    );
  }

  startDrive() {
    this.mainFullScreen();
    this.carService.startDrive(this.car.carId, this.currentUser.employeeId).subscribe(
      car => {
        this.car = car;
        this.runningTime = new Date().getTime() - car.startDate;
      });
  }

  finishDrive() {
    this.exitFullscreen();
    this.runningTime = 0;
    this.carService.finishDrive(this.car.carId).subscribe(
      car => this.car = car);
  }

  mainFullScreen() {
    this.bigScreenService.request(this.mainContainer);
  }

  exitFullscreen() {
    if (this.bigScreenService.isFullscreen()) {
      this.bigScreenService.exit();
    }
  }
}
