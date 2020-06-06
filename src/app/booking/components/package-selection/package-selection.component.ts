import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/models/UserData';

@Component({
  selector: 'app-package-selection',
  templateUrl: './package-selection.component.html',
  styleUrls: ['./package-selection.component.scss']
})
export class PackageSelectionComponent implements OnInit {

  userdetails : UserData
  packages = [
    {
      name: 'Basic Package',
      des: 'Does all the basic stuff'
    },
    {
      name: 'Premium Package',
      des: 'Does all the basic stuff plus some extra to make your car go wroom'
    },
    {
      name: 'Executive Package',
      des: 'Sit back and relax as we do everything we can to make your car just as a new one'
    }
  ];
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails')) 
  }

  packageSelected(item: string) {
    console.log(`Selected Package: ${item}`);
    this.userdetails.PackageId = 1 //Add the service id
    localStorage.setItem('UserDetails',JSON.stringify(this.userdetails));
    this._router.navigate(['../booking/dealerSelection']);
  }

}
