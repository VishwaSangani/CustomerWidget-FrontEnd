import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor() { }

  details = {
    name: 'Dev Chhaniyara',
    package: 'Basic Package',
    dealer: 'All-Star Service',
    address: 'Some random address',
    date: '24/5/2020',
    time: '14:00',
    services: 'Washing',
    price: 500,
  };

  ngOnInit(): void {
  }

}
