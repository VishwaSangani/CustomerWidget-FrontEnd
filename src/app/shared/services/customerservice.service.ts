import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Customer, UserLogin } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {
   private baseUrl: string = 'http://localhost:59699/api/';
  //private baseUrl:string = ' http://127.0.0.1:8080/api/';

  constructor(private http: HttpClient, ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  createCustomer(customer: Customer) {
    return this.http.post(this.baseUrl + "CreateCustomer", customer);
  }

  ValidateUser(user: UserLogin) {
    return this.http.post(this.baseUrl + "LoginApi/PostCustomer", user);
  }

  getCustomer(id:number){
    return this.http.get(this.baseUrl + 'getCustomer?id=' + id);
  }

  UpdateCustomer(id, data){
    return this.http.put(this.baseUrl + 'api/editCustomer?id=' + id, JSON.stringify(data), this.httpOptions)
      // .pipe(
      //   retry(1),
      //   catchError(this.errorHandl)
      // )
  }


}
