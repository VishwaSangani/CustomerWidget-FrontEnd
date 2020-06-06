import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import {Car, CarDetails} from '../models/Car'

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  constructor(private http : HttpClient) { }

   private baseUrl:string = 'http://localhost:59699/api/';
  // private baseUrl:string = ' http://127.0.0.1:8080/api/';

  addCar(car : Car){
    return this.http.post(this.baseUrl+"RegisterCar", car);
  }

  getCars(obj : CarDetails){
    return this.http.post(this.baseUrl+"GetCarList/",obj);
  }
}
