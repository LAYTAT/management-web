import {Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Car} from '../entity/car';
import {AuthService} from '../service/auth.service';
import {CarService} from '../service/car.service';
import {User} from '../entity/user';
import {BigScreenService} from 'angular-bigscreen';
import {MqttService} from 'ngx-mqtt';
import {WidthService} from '../service/width.service';

@Component({
  selector: 'app-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit, OnChanges, DoCheck {
  @ViewChild('mainContainer')
  mainContainerRef: ElementRef;
  mainContainer: HTMLElement;

  @ViewChild('statistic')
  statisticRef: ElementRef;
  statistic: HTMLElement;

  @Input()
  carId: number;
  car: Car;
  currentUser: User;
  runningTime = 0;

  isFullscreen = false;

  constructor(public authService: AuthService,
              private carService: CarService,
              private bigScreenService: BigScreenService,
              private mqttService: MqttService,
              private widthService: WidthService) {
  }

  ngOnInit() {
    this.mainContainer = this.mainContainerRef.nativeElement;
    this.statistic = this.statisticRef.nativeElement;
    this.getCurrentUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.carId.currentValue) {
      this.getCar();
      this.mqttService.observe(`diggers/${this.carId}/busy`)
        .subscribe(() => {
          this.getCar();
        });
    }
  }

  ngDoCheck(): void {
    this.isFullscreen = this.bigScreenService.isFullscreen();
    this.widthService.width = this.statistic.offsetWidth;
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
        if (car.currentDriver) {
          this.authService.available = car.currentDriver.employeeId === this.authService.currentUser.employeeId;
        }
      }
    );
  }

  startDrive(): void {
    this.requestFullScreen();
    this.carService.startDrive(this.car.carId, this.currentUser.employeeId).subscribe(
      car => {
        this.car = car;
        this.runningTime = new Date().getTime() - car.startDate;
        this.authService.available = true;
        this.mqttService.unsafePublish(`diggers/${this.carId}/busy`, 'true', {qos: 1});
      });
  }

  finishDrive(): void {
    this.exitFullscreen();
    this.runningTime = 0;
    this.carService.finishDrive(this.car.carId).subscribe(
      car => {
        this.car = car;
        this.authService.available = false;
        this.mqttService.unsafePublish(`diggers/${this.carId}/busy`, 'false', {qos: 1});
      });
  }

  requestFullScreen(): void {
    this.bigScreenService.request(this.mainContainer);
  }

  exitFullscreen() {
    if (this.bigScreenService.isFullscreen()) {
      this.bigScreenService.exit();
    }
  }
}
