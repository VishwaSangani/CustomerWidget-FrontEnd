import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl:string = 'http://localhost:59699/api/';
  constructor(private http: HttpClient) { }

  getAppointmentId(appointment){
    return this.http.post(this.baseUrl+"Appoinment/PostAppoinment", appointment);
  }
}
