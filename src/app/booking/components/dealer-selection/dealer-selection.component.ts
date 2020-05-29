import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dealer-selection',
  templateUrl: './dealer-selection.component.html',
  styleUrls: ['./dealer-selection.component.scss']
})
export class DealerSelectionComponent implements OnInit {

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
  }
  dealerSelected(id) {
    console.log(id);
    this._router.navigate(['../booking/slotSelection']);
  }
}
