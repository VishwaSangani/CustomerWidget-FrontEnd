import { Component, OnInit, Input } from '@angular/core';
import { CustomerserviceService } from 'src/app/shared/services/customerservice.service';
import { UserData } from 'src/app/shared/models/UserData';
import { Customer, Customers } from 'src/app/shared/models/Customer';
import { tick } from '@angular/core/testing';
import { states } from '../../../../environments/variables';
import{NgForm, FormGroup,Validators, FormBuilder, FormControl} from '@angular/forms';
import {NgControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
 
   
  enable=false;
  states: string[];
  userdetails:UserData;
  updateForm: FormGroup;
  all: boolean = true;
  customer:Customer = {
    FirstName: '',
    LastName: '',
    Address: null,
    Email: '',
    Password: '',
    ContactNo: null
  };
  customers:Customers = {
    FirstName: '',
    LastName: '',
    Address: null,
    Email: '',
    Password: '',
    ContactNo: null,
    CustomerId: null
  };
  Address = [];
  Zip = [];
  address1;
  address2;
  city;
  state;
  zipcode;

  constructor( 
    private getCustomer : CustomerserviceService,
    public formBuilder: FormBuilder,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) { }
  registerForm:FormGroup;

  ngOnInit(): void {
    this.states = states;
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails'));
    console.log((this.userdetails));
    this.getCustomer.getCustomer((this.userdetails.CustomerId)).subscribe
    (
      data => {
        // console.log(data);
        this.customer.FirstName = data[0].FirstName;
        this.customer.LastName = data[0].LastName;
        this.customer.Email = data[0].Email;
       // this.customer.Address = data[0].Address;
        this.customer.ContactNo = data[0].ContactNo;
       this.Address = data[0].Address.split(',');
       console.log(this.Address.length);
       if(this.Address.length == 3) 
       {
         this.address1 = this.Address[0];
         this.address2 = "  -  ";
         this.city = this.Address[1];
         this.Zip = this.Address[2].split('-');
         this.state = this.Zip[0];
         this.zipcode = this.Zip[1];
         console.log(this.Zip)
    
       }
       else if(this.Address.length == 4) 
       {
         this.address1 = this.Address[0];
         this.address2 = this.Address[1];
         this.city = this.Address[2];
         this.Zip = this.Address[3].split('-');
         this.state = this.Zip[0];
         this.zipcode = this.Zip[1];
    
       }
       this.value();
      });
      //this.updateCustomer();
    }
    value()
    {
      this.registerForm = this.formBuilder.group({
      firstName : [this.customer.FirstName,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      lastName : [this.customer.LastName,[Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      emailId : [this.customer.Email,[Validators.required,Validators.email]],
      address : [this.address1,Validators.required],
      address2 : [this.address2],
      mobileNumber : [this.customer.ContactNo,[Validators.required,Validators.pattern("[0-9 ]{10}")]],
      city : [this.city,Validators.required],
      state : [this.state,Validators.required],
      zipcode : [this.zipcode,[Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("[0-9 ]{6}")]],
     })
    }
  enableText()
  {
this.enable = !this.enable;
  }

  saveEmployee(customer: Customer)
  {
    console.log(customer);
  }
  onSubmit()
  {
    
    this.customers.FirstName = this.registerForm.controls.firstName.value;
    this.customers.LastName = this.registerForm.controls.lastName.value;
    this.customers.Email = this.registerForm.controls.emailId.value;
    this.customers.ContactNo = this.registerForm.controls.mobileNumber.value;
    this.customers.Password = this.userdetails.Password;
    this.customers.CustomerId = this.userdetails.CustomerId;
    if(this.registerForm.controls.address2.value === "  -  ")
    {
      
    this.customers.Address = this.registerForm.controls.address.value + "," + 
    this.registerForm.controls.city.value + "," +
    this.registerForm.controls.state.value + "-" +
    this.registerForm.controls.zipcode.value;
    }
    else{
      this.customers.Address = this.registerForm.controls.address.value + "," + 
      this.registerForm.controls.address2.value + "," + 
      this.registerForm.controls.city.value + "," +
      this.registerForm.controls.state.value + "-" +
      this.registerForm.controls.zipcode.value;

    }
    console.log(this.customers);
    this.getCustomer.UpdateCustomer(this.userdetails.CustomerId,this.customers)
    .subscribe(
      data =>
      {
        this._router.navigate(['/booking']);
        this.openSnackbar("Your Details Updated Successfully!")
        console.log("updated!!");
      },
      error =>
      {
        console.log("error", error);
      }
    )
    
  }

  openSnackbar(message: string) {
    this._snackbar.open(message, null, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
