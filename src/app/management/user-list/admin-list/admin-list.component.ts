import {Component, OnInit} from '@angular/core';
import {RoleName} from '../../../shared/entity/role';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  roleName = RoleName.ROLE_ADMIN;

  ngOnInit(): void {
  }

}
