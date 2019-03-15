import {Component, Input, OnInit} from '@angular/core';
import {KeyboardEventService} from '../../shared/service/keyboard-event.service';
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

  constructor(private keyboardEventService: KeyboardEventService,
              private mqttService: MqttService) {
  }

  ngOnInit() {
    this.keyboardEventService.keydown$.pipe(
      filter(event => event.key === this.key),
      throttleTime(200),
      tap(() => this.pressed = true),
      concatMap(
        () => this.mqttService.publish(`car`,
          `${this.key}`, {qos: 1}))
    ).subscribe();
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === this.key),
      throttleTime(200),
      tap(() => this.pressed = false),
      concatMap(
        () => this.mqttService.publish(`car`,
          `${this.key}`, {qos: 1}))
    ).subscribe();
  }
}
