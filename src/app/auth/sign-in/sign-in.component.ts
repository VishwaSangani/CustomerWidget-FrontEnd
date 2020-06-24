import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { UserLogin } from 'src/app/shared/models/Customer';
import { UserData } from 'src/app/shared/models/UserData';
import { CustomerserviceService } from 'src/app/shared/services/customerservice.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signinform: FormGroup;
  userError : string;
  customer: UserLogin = {
    Email: null,
    Password: null
  };
  userdetails: UserData;
  constructor(private formbuilder: FormBuilder,
    private _createcustomer: CustomerserviceService,
    private router: Router) { }
  hide = true;

  ngOnInit(): void {
    this.signinform = this.formbuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }



  onSubmit() {
    const md5 = new Md5();
    var encPwd = md5.appendAsciiStr(this.signinform.controls.password.value).end();
    this.customer.Email = this.signinform.controls.userName.value;
    this.customer.Password = encPwd.toString();

    this._createcustomer.ValidateUser(this.customer)
      .subscribe(
        data => {
          console.log(data["CustomerId"]);
        
          this.userdetails = {
            Email: this.customer.Email,
            CarId: null,
            PackageId: null,
            PackageName: '',
            DealerId: null,
            BookingDate: null,
            SlotTime: null,
            Password: this.customer.Password,
            CustomerId: data["CustomerId"]
          }
          localStorage.setItem('UserDetails', JSON.stringify(this.userdetails));
          this.userError = ""
          console.log(this.userdetails);
          this.router.navigate(['/booking']);
        },
        (error: HttpErrorResponse) => {
          
          this.userError = error.error;
        });

  }

}

