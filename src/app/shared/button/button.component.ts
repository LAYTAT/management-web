import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {KeyboardEventService} from '../service/keyboard-event.service';
import {MqttService} from 'ngx-mqtt';
import {concatMap, filter, tap, throttleTime} from 'rxjs/operators';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit, DoCheck {
  @Input()
  key: string;
  @Input()
  name: string;
  pressed = false;

  @Input()
  carId: number;

  available = false;

  constructor(private keyboardEventService: KeyboardEventService,
              private mqttService: MqttService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.keyboardEventService.keydown$
      .pipe(
        filter(() => this.available),
        filter(event => event.key === this.key),
        throttleTime(150),
        tap(() => {
          this.pressed = true;
        }),
        concatMap(
          () => this.mqttService.publish(`diggers/${this.carId}/command`,
            `${this.key}`, {qos: 1}))
      ).subscribe();
    this.keyboardEventService.keyup$
      .pipe(
        filter(() => this.available),
        filter(event => event.key === this.key),
        tap(() => {
          this.pressed = false;
        }),
        concatMap(
          () => this.mqttService.publish(`diggers/${this.carId}/command`,
            `${this.key}s`, {qos: 1}))
      ).subscribe();
  }

  ngDoCheck(): void {
    this.available = this.authService.available;
  }
}
