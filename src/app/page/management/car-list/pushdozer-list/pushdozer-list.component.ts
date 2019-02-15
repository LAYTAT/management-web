import {Component, OnInit} from '@angular/core';
import {CarName} from '../../../../model/car';

@Component({
  selector: 'app-pushdozer-list',
  templateUrl: './pushdozer-list.component.html',
  styleUrls: ['./pushdozer-list.component.css']
})
export class PushdozerListComponent implements OnInit {
  carName = CarName.PUSHDOZER;

  constructor() {
  }

  ngOnInit() {
  }
}
