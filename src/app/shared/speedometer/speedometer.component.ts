import {Component, Input, OnInit} from '@angular/core';
import {MqttService} from 'ngx-mqtt';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.css']
})
export class SpeedometerComponent implements OnInit {
  value = 0;

  @Input()
  carId: number;

  constructor(private mqttService: MqttService) {

  }

  ngOnInit(): void {
    this.mqttService.observe(`diggers/${this.carId}/speed`)
      .subscribe(message => console.log(message.payload.toString()));
  }
}
