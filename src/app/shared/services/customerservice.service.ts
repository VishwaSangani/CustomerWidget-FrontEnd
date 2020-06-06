import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Customer, UserLogin } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {
  //private baseUrl:string = 'http://localhost:59699/api/CreateCustomer';
  private baseUrl: string = ' http://127.0.0.1:8080/api/';

  constructor(private http: HttpClient, ) { }

  createCustomer(customer: Customer) {
    return this.http.post(this.baseUrl + "CreateCustomer", customer);
  }

  ValidateUser(user: UserLogin) {
    return this.http.post(this.baseUrl + "LoginApi/PostCustomer", user);
  }

}
