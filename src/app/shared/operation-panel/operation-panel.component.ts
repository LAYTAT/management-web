import {Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Car} from '../entity/car';
import {AuthService} from '../service/auth.service';
import {CarService} from '../service/car.service';
import {User} from '../entity/user';
import {BigScreenService} from 'angular-bigscreen';
import {MqttService} from 'ngx-mqtt';

@Component({
  selector: 'app-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit, OnChanges, DoCheck {
  @ViewChild('mainContainer')
  mainContainerRef: ElementRef;
  mainContainer: HTMLElement;

  @Input()
  carId: number;
  car: Car;
  currentUser: User;
  runningTime = 0;

  automatic = false;

  isFullscreen = false;

  qualified = false;

  constructor(private authService: AuthService,
              private carService: CarService,
              private bigScreenService: BigScreenService,
              private mqttService: MqttService) {
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

  ngDoCheck(): void {
    this.isFullscreen = this.bigScreenService.isFullscreen();
    this.qualified = this.authService.qualified;
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
        this.authService.qualified = !this.car.currentDriver ||
          this.car.currentDriver.employeeId === this.currentUser.employeeId;
      }
    );
  }

  startDrive(): void {
    this.mainFullScreen();
    this.carService.startDrive(this.car.carId, this.currentUser.employeeId).subscribe(
      car => {
        this.car = car;
        this.runningTime = new Date().getTime() - car.startDate;
      });
  }

  finishDrive(): void {
    this.exitFullscreen();
    this.runningTime = 0;
    this.carService.finishDrive(this.car.carId).subscribe(
      car => this.car = car);
  }

  mainFullScreen(): void {
    this.bigScreenService.request(this.mainContainer);
  }

  exitFullscreen() {
    if (this.bigScreenService.isFullscreen()) {
      this.bigScreenService.exit();
    }
  }

  clickSwitch(): void {
    this.mqttService.publish(`diggers/${this.carId}/command`,
      String(this.automatic), {qos: 1});
  }
}
