import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/models/UserData';

@Component({
  selector: 'app-dealer-selection',
  templateUrl: './dealer-selection.component.html',
  styleUrls: ['./dealer-selection.component.scss']
})
export class DealerSelectionComponent implements OnInit {

  userdetails : UserData
  dealerList = [
    {
      id: 1,
      name: 'All-Star Service',
      service: 'Washing',
      price: 500
    },
    {
      id: 2,
      name: 'Flashpoint Service',
      service: 'Washing',
      price: 500
    },
    {
      id: 3,
      name: 'Action Service',
      service: 'Washing',
      price: 500
    },
    {
      id: 4,
      name: 'Astonish Service',
      service: 'Washing',
      price: 500
    },
    {
      id: 5,
      name: 'Red Hood Service',
      service: 'Washing',
      price: 500
    },
    {
      id: 6,
      name: 'Atlantis Service',
      service: 'Washing',
      price: 500
    },
    {
      id: 7,
      name: 'Titans Service',
      service: 'Washing',
      price: 500
    }
  ];
  constructor(private _router: Router) { }

  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails')) 
  }
  dealerSelected(id) {
    this.userdetails.DealerId = id;
    localStorage.setItem('UserDetails',JSON.stringify(this.userdetails));
    this._router.navigate(['../booking/slotSelection']);
  }
}
