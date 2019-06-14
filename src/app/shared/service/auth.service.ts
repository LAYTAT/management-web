import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../entity/user';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = `${environment.apiUrl}/users`;

  private _redirectUrl = '';
  private currentUserSubject = new BehaviorSubject<User>(null);

  private _available = false;

  constructor(private http: HttpClient) {
    if (this.loggedIn) {
      this.currentUserSubject.next(JSON.parse(localStorage.getItem('current_user')));
    }
  }

  get available(): boolean {
    return this._available;
  }

  set available(value: boolean) {
    this._available = value;
  }

  get currentUser(): User {
    return this.currentUserSubject.getValue();
  }

  get redirectUrl(): string {
    return this._redirectUrl;
  }

  set redirectUrl(url: string) {
    this._redirectUrl = url;
  }

  login(username: string, password: string): Observable<null> {
    const url = `${this.usersUrl}/login`;
    return this.http.post<User>(url,
      null,
      {observe: 'response', params: {username: username, password: password}})
      .pipe(
        tap(resp => {
          localStorage.setItem('access_token', resp.headers.get('access-token'));
          localStorage.setItem('current_user', JSON.stringify(resp.body));
          this.currentUserSubject.next(resp.body);
        }),
        map(() => null)
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
  }

  private loggedIn(): boolean {
    return !!(localStorage.getItem('current_user')
      && localStorage.getItem('access_token'));
  }
}
