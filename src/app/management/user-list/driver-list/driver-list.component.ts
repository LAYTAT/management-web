import {Component, OnInit} from '@angular/core';
import {RoleName} from '../../../shared/model/role';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
  roleName = RoleName.ROLE_DRIVER;

  constructor() {
  }

  ngOnInit() {
  }
}
