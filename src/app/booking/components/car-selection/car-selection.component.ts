import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-selection',
  templateUrl: './car-selection.component.html',
  styleUrls: ['./car-selection.component.scss']
})
export class CarSelectionComponent implements OnInit {

  constructor(private _router: Router) { }

  carList = [
    {
      name: 'Hummer H1',
      number: 'GJ18FC1573'
    },
    {
      name: 'Hummer H2',
      number: 'GJ18FC1353'
    },
    {
      name: 'Hummer H3',
      number: 'GJ18FC1263'
    },
    {
      name: 'Hummer H3',
      number: 'GJ18FC1263'
    }
  ];
  ngOnInit(): void {
  }


  carSelected(name: String) {
    console.log(`Selected Item: ${name}`);
    this._router.navigate(['../booking/packageSelection']);
  }
}
