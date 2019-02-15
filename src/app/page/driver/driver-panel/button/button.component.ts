import {Component, Input, OnInit} from '@angular/core';
import {MqttService} from 'ngx-mqtt';
import {concatMap, filter, tap} from 'rxjs/operators';
import {KeyboardEventService} from '../../../../injectable/service/keyboard-event.service';

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
      tap(() => this.pressed = true),
      concatMap(() => this.mqttService.publish(`car`,
        `${this.key}`, {qos: 1}))
    ).subscribe();
    this.keyboardEventService.keyup$.pipe(
      filter(event => event.key === this.key),
      tap(() => this.pressed = false),
      concatMap(() => this.mqttService.publish(`car`,
        `${this.key}`, {qos: 1}))
    ).subscribe();
  }
}
