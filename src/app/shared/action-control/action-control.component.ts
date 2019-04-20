import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-action-control',
  templateUrl: './action-control.component.html',
  styleUrls: ['./action-control.component.css']
})
export class ActionControlComponent implements OnInit {
  @Input()
  carId: number;

  constructor() {
  }

  ngOnInit() {
  }

}
