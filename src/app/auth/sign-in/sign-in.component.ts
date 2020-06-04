import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { UserLogin } from 'src/app/shared/models/Customer';
import { CustomerserviceService } from 'src/app/shared/services/customerservice.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signinform:FormGroup;
  customer:UserLogin = {
    Email:null,
    Password:null
  }
  constructor(private formbuilder : FormBuilder,
    private _createcustomer: CustomerserviceService,
    private router: Router) { }
  hide =true

  ngOnInit(): void {
    this.signinform = this.formbuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    });
  }

  onSubmit(){
    console.log(this.signinform.value)
    const md5 = new Md5();  
var encPwd = md5.appendAsciiStr(this.signinform.controls.password.value).end();
this.customer.Email = this.signinform.controls.userName.value;
this.customer.Password = encPwd.toString();

console.log(this.customer)

this._createcustomer.ValidateUser(this.customer)
.subscribe(
  data => {
    localStorage.setItem('UserEmail', JSON.stringify(this.customer.Email));
    this.router.navigate(['/booking']);
  },
  (error:HttpErrorResponse) => {
  console.log(error.error);
alert(error.error);

});

}

  }

