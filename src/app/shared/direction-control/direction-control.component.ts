import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-direction-control',
  templateUrl: './direction-control.component.html',
  styleUrls: ['./direction-control.component.css']
})
export class DirectionControlComponent implements OnInit {
  @Input()
  carId: number;

  constructor() {
  }

  ngOnInit() {
  }

}
