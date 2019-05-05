import {Component, Input, OnInit} from '@angular/core';
import {MqttService} from 'ngx-mqtt';

@Component({
  selector: 'app-battery-indicator',
  templateUrl: './battery-indicator.component.html',
  styleUrls: ['./battery-indicator.component.css']
})
export class BatteryIndicatorComponent implements OnInit {
  value = 0;
  @Input()
  carId: number;

  constructor(private mqttService: MqttService) {
  }

  ngOnInit() {
    this.mqttService.observe(`diggers/${this.carId}/battery`)
      .subscribe(message => console.log(message.payload.toString()));
  }

}
