import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../shared/service/auth.service';
import {NzDrawerRef, NzDrawerService} from 'ng-zorro-antd';
import {User} from '../../shared/entity/user';
import {RoleName} from '../../shared/entity/role';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  visibleDrawer = false;
  @ViewChild('drawerTemplate')
  drawerTemplate;
  drawerRef: NzDrawerRef;
  currentUser: User;
  isBoss: boolean;

  constructor(private authService: AuthService,
              private drawerService: NzDrawerService,
              private router: Router) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.isBoss = !!this.currentUser.roles.find(
      role => role.roleName === RoleName.ROLE_BOSS);
  }

  openDrawer(): void {
    this.visibleDrawer = true;
    this.drawerRef = this.drawerService.create({
      nzContent: this.drawerTemplate,
      nzPlacement: 'left',
      nzClosable: false
    });
    this.drawerRef.afterClose.subscribe(
      () => this.visibleDrawer = false
    );
  }

  closeDrawer(): void {
    this.drawerRef.close();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/users/login']);
  }

  getCurrentUser(): void {
    this.currentUser = this.authService.currentUser;
  }
}
