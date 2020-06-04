import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {
  private baseUrl:string = 'http://localhost:59699/api/CreateCustomer';
 // private ServerUrl:string = "https://localhost:44321/api/Customers/"

  constructor(private http: HttpClient,
    ) { }
 
createCustomer(customer: Customer){
return this.http.post(this.baseUrl, customer);
}
}
