import {Component, OnInit} from '@angular/core';
import {CarName} from '../../../../model/car';

@Component({
  selector: 'app-digger-list',
  templateUrl: './digger-list.component.html',
  styleUrls: ['./digger-list.component.css']
})
export class DiggerListComponent implements OnInit {
  carName = CarName.DIGGER;

  constructor() {
  }

  ngOnInit() {
  }

}
