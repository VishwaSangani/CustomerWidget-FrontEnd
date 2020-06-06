import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Summary, PostSummary } from '../models/Summary';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private baseUrl:string = 'http://localhost:59699/api/';
  //private baseUrl:string = ' http://127.0.0.1:8080/api/';

  constructor(private http: HttpClient,
    ) { }

    getSummary(summary : Summary){
      return this.http.post(this.baseUrl+"GetAppointmentDetails", summary);
    }

    postSummary(postsummary : PostSummary){
      return this.http.post(this.baseUrl+"Summary/PostSummary/", postsummary);
    }

}
