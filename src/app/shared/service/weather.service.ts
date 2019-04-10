import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Weather} from '../entity/weather/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {
  }

  getCurrentWeather(): Observable<Weather> {
    return this.http.get<Weather>(`${environment.weatherUrl}/now`,
      {params: {'location': 'auto_ip', 'key': environment.key}});
  }

  getForecast() {
    return this.http.get<Weather>(`${environment.weatherUrl}/forecast`,
      {params: {'location': 'auto_ip', 'key': environment.key}});
  }
}
