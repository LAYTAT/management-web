import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../model/page';
import {Car, CarName} from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  carsUrl = `${environment.apiUrl}/cars`;

  constructor(private http: HttpClient) {
  }

  findByCarId(carId: number): Observable<Car> {
    return this.http.get<Car>(`${this.carsUrl}/${carId}`);
  }

  findAllByDriver(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.carsUrl}/mycars`);
  }

  findAll(carName: CarName,
          carId: string,
          pageIndex: number,
          pageSize: number,
          sort: string): Observable<Page<Car>> {
    return this.http.get<Page<Car>>(this.carsUrl, {
      params: {
        'carName': carName,
        'carId': carId,
        'page': String(pageIndex - 1),
        'size': String(pageSize),
        'sort': sort
      }
    });
  }

  save(car: Car, carName: CarName): Observable<Car> {
    return this.http.post<Car>(`${this.carsUrl}`, car, {params: {'carName': carName}});
  }

  addDriver(carId: number, employeeId: number): Observable<Car> {
    return this.http.post<Car>(`${this.carsUrl}/${carId}/drivers`, null,
      {params: {employeeId: String(employeeId)}});
  }

  removeDriver(carId: number, employeeId: number): Observable<Car> {
    return this.http.delete<Car>(`${this.carsUrl}/${carId}/drivers`,
      {params: {employeeId: String(employeeId)}});
  }

  updateLiveUrl(carId: number, liveUrl: string): Observable<Car> {
    return this.http.patch<Car>(`${this.carsUrl}/${carId}`,
      {'liveUrl': liveUrl});
  }
}
