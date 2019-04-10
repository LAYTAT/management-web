import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/service/auth.service';
import {User} from '../../shared/entity/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  visibleDrawer = false;
  currentUser: User;
  isBoss: boolean;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/users/login']);
  }

  getCurrentUser(): void {
    this.currentUser = this.authService.currentUser;
  }
}
