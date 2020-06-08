import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators,FormBuilder, ValidatorFn, ValidationErrors } from '@angular/forms';
import { states } from '../../../environments/variables';
import {Md5} from 'ts-md5/dist/md5';
import { Customer } from 'src/app/shared/models/Customer';
import { CustomerserviceService } from 'src/app/shared/services/customerservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  customer:Customer = {
    
    FirstName:"",
    LastName:"",
    Email:null,
    ContactNo:null,
    Address:"",
    Password:null


  }
  
  registerForm:FormGroup;
  states: string[] 
  hide = true
  cnfhide =true
  constructor(private formBuilder:FormBuilder,
              private _createcustomer: CustomerserviceService,
              private router: Router) { }

  ngOnInit(): void {
    this.states = states;
    this.registerForm = this.formBuilder.group({
      firstName : ['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      lastName : ['',[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      emailId : ['',[Validators.required,Validators.email]],
      address : ['',Validators.required],
      address2 : [''],
      mobileNumber : ['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
      city : ['',Validators.required],
      state : ['',Validators.required],
      zipcode : ['',[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("[0-9 ]{6}")]],
      password : ['',[Validators.required,Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
      confirmPassword : ['', Validators.required],
    },
      { 
        validator: this.passwordMatch('password','confirmPassword')
      }
    );
  }

  passwordMatch(password: string, confirmPassword: string){
    return(formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }

  }

 

  onSubmit(){
    //alert('Clicked')

    console.log(this.registerForm.controls.address.value)
    console.log(this.registerForm.value)
  // var md5 = require('md5');
    const md5 = new Md5();
 
    var encPwd = md5.appendAsciiStr(this.registerForm.controls.password.value).end();
    this.customer.FirstName = this.registerForm.controls.firstName.value;
    this.customer.LastName = this.registerForm.controls.lastName.value;
    this.customer.Email = this.registerForm.controls.emailId.value;
    this.customer.Password = encPwd.toString();
    this.customer.ContactNo = this.registerForm.controls.mobileNumber.value;
    if(this.registerForm.controls.address2.value === "")
    {
      this.customer.Address = this.registerForm.controls.address.value + ", " +
                              this.registerForm.controls.city.value + ", " +
                              this.registerForm.controls.state.value + "-" +
                              this.registerForm.controls.zipcode.value;  
    }
    else{
      this.customer.Address = this.registerForm.controls.address.value + ", " +
                              this.registerForm.controls.address2.value + ", " +
                              this.registerForm.controls.city.value + ", " +
                              this.registerForm.controls.state.value + "-" +
                              this.registerForm.controls.zipcode.value;  
    }

    console.log(this.customer);
        this._createcustomer.createCustomer(this.customer)
        .subscribe(
          data => {
            alert(data);
            console.log(data+"DATA");
            console.log('Customer added!');
            this.registerForm.reset();
            this.router.navigate(['/signin']);
          },
          (error:HttpErrorResponse) => {
          console.log(error.error);
        alert(error.error);
        this.registerForm.controls.emailId.reset();
        this.registerForm.controls.emailId.setErrors({'duplicate': true});
        // this.registerForm.controls['emailId'].setErrors({duplicate: true});
        
        });

    }

}
