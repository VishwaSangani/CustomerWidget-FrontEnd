import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  // private baseUrl: string = 'http://localhost:59699/api/';
   private baseUrl:string = ' http://127.0.0.1:8080/api/';
  constructor(private http: HttpClient) { }

  getAppointmentId(appointment) {
    return this.http.post(this.baseUrl + 'Appoinment/PostAppoinment', appointment);
  }

getAppointmentDetail(email)
{
  return this.http.get(this.baseUrl + "GetAppointments?email=" + email);
}

}
