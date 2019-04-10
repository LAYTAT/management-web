import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RoleName} from '../entity/role';
import {environment} from '../../../environments/environment';
import {User} from '../entity/user';
import {Observable} from 'rxjs';
import {Page} from '../entity/page';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  findAll(roleName: RoleName, employeeId: string,
          pageIndex: number, pageSize: number, sort: string): Observable<Page<User>> {
    let url: string;
    if (roleName === RoleName.ROLE_DRIVER) {
      url = `${this.usersUrl}/drivers`;
    } else if (roleName === RoleName.ROLE_ADMIN) {
      url = `${this.usersUrl}/admins`;
    }
    const params = new HttpParams().append('roleName', roleName)
      .append('employeeId', employeeId)
      .append('page', String(pageIndex - 1))
      .append('size', String(pageSize))
      .append('sort', sort);
    return this.http.get<Page<User>>(url, {params: params});
  }

  deleteByEmployeeId(employeeId: number) {
    return this.http.delete(`${this.usersUrl}/${employeeId}`);
  }

  save(user: User, roleName: RoleName): Observable<User> {
    let url: string;
    if (roleName === RoleName.ROLE_DRIVER) {
      url = `${this.usersUrl}/drivers`;
    } else if (roleName === RoleName.ROLE_ADMIN) {
      url = `${this.usersUrl}/admins`;
    }
    return this.http.post<User>(url, user, {params: {'roleName': roleName}});
  }
}
