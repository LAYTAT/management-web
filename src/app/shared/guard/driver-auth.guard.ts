import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {RoleName} from '../entity/role';

@Injectable({
  providedIn: 'root'
})
export class DriverAuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const url = route.path;
    return this.checkLogin(url);
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

  private checkLogin(url: string): boolean {
    if (this.authService.currentUser) {
      const roles = this.authService.currentUser.roles;
      if (roles.find(role => role.roleName === RoleName.ROLE_DRIVER)) {
        return true;
      }
      if (roles.find(role => role.roleName === RoleName.ROLE_ADMIN ||
        role.roleName === RoleName.ROLE_BOSS)) {
        this.router.navigate(['/management']);
        return false;
      }
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/unauthorization']);
    return false;
  }
}
