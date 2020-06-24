import { Component, OnInit, Input } from '@angular/core';
import { CustomerserviceService } from 'src/app/shared/services/customerservice.service';
import { UserData } from 'src/app/shared/models/UserData';
import { Customer } from 'src/app/shared/models/Customer';
import { tick } from '@angular/core/testing';
import { states } from '../../../environments/variables';
import{NgForm, FormGroup, FormBuilder, FormControl} from '@angular/forms';
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
  customer:Customer = {
    FirstName: '',
    LastName: '',
    Address: null,
    Email: '',
    Password: '',
    ContactNo: null
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
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.states = states;
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails'));
    console.log((this.userdetails));
    this.getCustomer.getCustomer((this.userdetails.CustomerId)).subscribe
    (
      data => {
         console.log(data);
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
      });
      this.updateCustomer();
    }
  enableText()
  {
this.enable = !this.enable;
  }

  updateCustomer() {
    this.updateForm = this.fb.group({
      firstname: ['',new FormControl({disabled : true})],
      lastname: [''],
      email: [''],
      contact: [],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      zipcode: [],
    })
  }

  Save()
  {
    console.log("Data:"+ this.updateForm.value )
  }
}
