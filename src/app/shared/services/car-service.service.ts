import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Car, CarDetails } from '../models/Car';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  constructor(private http: HttpClient) { }

  //private baseUrl: string = 'http://localhost:59699/api/';
   private baseUrl:string = ' http://127.0.0.1:8080/api/';

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  addCar(car: Car) {
    return this.http.post(this.baseUrl + 'RegisterCar', car);
  }

  getCars(obj: CarDetails) {
    return this.http.post(this.baseUrl + 'GetCarList/', obj);
  }

  getCar(id: number) {
    return this.http.get(this.baseUrl + 'GetCar?id=' + id);
  }

  UpdateCar(id, data) {
    return this.http.put(this.baseUrl + 'UpdateCar?id=' + id, JSON.stringify(data), this.httpOptions)
    // .pipe(
    //   retry(1),
    //   catchError(this.errorHandl)
    // )
  }

  getAllPackages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}GetServicePackage`);
  }

  getDealers(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}GetDealerList?packageId=${id}`);
  }
}
