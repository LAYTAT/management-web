import {Component, Input, OnInit} from '@angular/core';
import {KeyboardEventService} from '../service/keyboard-event.service';
import {MqttService} from 'ngx-mqtt';
import {concatMap, filter, tap, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input()
  key: string;
  @Input()
  name: string;
  pressed = false;

  @Input()
  carId: number;

  constructor(private keyboardEventService: KeyboardEventService,
              private mqttService: MqttService) {
  }

  ngOnInit() {
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === this.key),
      throttleTime(150),
      tap(() => {
        this.pressed = true;
      }),
      concatMap(
        () => this.mqttService.publish(`diggers/1000000`,
          `${this.key}`, {qos: 1}))
    ).subscribe();
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === this.key),
      tap(() => {
        this.pressed = false;
      }),
      concatMap(
        () => this.mqttService.publish(`diggers/1000000`,
          `${this.key}s`, {qos: 1}))
    ).subscribe();
  }
}
