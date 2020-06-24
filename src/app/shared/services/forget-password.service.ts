import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private baseurl: string = 'http://localhost:59699/api/';
  //private baseurl:string = ' http://127.0.0.1:8080/api/';
  constructor(private http: HttpClient) { }
  
  forgetPassword(email,url)
  {
   //console.log('url:....' + this.baseurl + 'ForgetPassword?email='+email+'&url='+url);
   //console.log('service..'+JSON.stringify(this.http.get(this.baseurl + 'ForgetPassword?email='+email+'&url='+url)));
   return this.http.get(this.baseurl + 'ForgetPassword?email='+email+'&url='+url);
  }

  url=null;
  resetPassword(email,password)
  {
    this.url=this.baseurl +'ResetPassword?email='+email+'&password='+password;
    //console.log('url:....' , this.url);    
    return this.http.post(this.url,email,password);
  }

}
