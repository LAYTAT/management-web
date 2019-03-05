import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/service/auth.service';
import {User} from '../../shared/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  visibleDrawer = false;
  currentUser: User;
  isBoss: boolean;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
  }

  getCurrentUser(): void {
    this.currentUser = this.authService.currentUser;
  }
}
