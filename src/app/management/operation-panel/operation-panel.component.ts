import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../../shared/model/car';

@Component({
  selector: 'app-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit {
  @Input()
  car: Car;

  constructor() {
  }

  ngOnInit() {
  }

}
