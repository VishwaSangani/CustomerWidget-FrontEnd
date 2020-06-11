import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminCalendarService {

  private baseUrl: string = 'http://localhost:59699/api/';

  constructor(private http: HttpClient) { }

 
  getAppointmentId(dealerid) {
    return this.http.get(this.baseUrl + 'GetDealerAppointmentList/?dealerId='+dealerid);
  }
}
