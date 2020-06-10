import { Component, OnInit } from '@angular/core';
import { CustomerserviceService } from 'src/app/shared/services/customerservice.service';
import { UserData } from 'src/app/shared/models/UserData';
import { Customer, Customers } from 'src/app/shared/models/Customer';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  constructor( 
    private getCustomer : CustomerserviceService
  ) { }
enable=false;
userdetails:UserData;
customer:Customers;
  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails'));
    console.log((this.userdetails.CustomerId));
    this.getCustomer.getCustomer((this.userdetails.CustomerId)).subscribe
    (
      data => {
        console.log(data);
      }
    )
  }
  enableText()
  {
this.enable = !this.enable;
  }
}
