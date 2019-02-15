import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Page} from '../../model/page';
import {Car, CarName} from '../../model/car';
import {UpdateCarRequest} from '../../model/update-car-request';

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

  findAllByCarName(carName: CarName,
                   pageIndex: number,
                   pageSize: number,
                   sort: string): Observable<Page<Car>> {
    return this.http.get<Page<Car>>(this.carsUrl, {
      params: {
        'carName': carName,
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

  updateByCarId(carId: number, request: UpdateCarRequest): Observable<Car> {
    return this.http.patch<Car>(`${this.carsUrl}/${carId}`, request);
  }
}
