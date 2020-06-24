import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { FormControl } from '@angular/forms';
import { SlotService } from 'src/app/shared/services/slot.service';
import { Slot } from 'src/app/shared/models/slot';
import { UserData } from 'src/app/shared/models/UserData';

const moment = _rollupMoment || _moment;
@Component({
  selector: 'app-slot-selection',
  templateUrl: './slot-selection.component.html',
  styleUrls: ['./slot-selection.component.scss']
})
export class SlotSelectionComponent implements OnInit {

  date = null;
  date1 = null;
  dealerName: string;
  dealerId;
  userdetails: UserData;
  slots: Slot[];
  slotCount : number = 0;
  currentDate = new Date();
  selDate = new Date(this.currentDate.getFullYear() + '/' + (this.currentDate.getMonth() + 1) + '/' + this.currentDate.getDate());
  minDate = new Date(this.currentDate.getFullYear() + '/' + (this.currentDate.getMonth() + 1) + '/' + this.currentDate.getDate());
  maxDate = new Date(this.currentDate.getFullYear() + '/' + (this.currentDate.getMonth() + 2) + '/' + this.currentDate.getDate());

  // tslint:disable-next-line: variable-name
  constructor(private _router: Router, private slotservice: SlotService) { }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails'));
    this.dealerId = this.userdetails.DealerId;
    this.getDealerName();
  }

  dateSelected(event) {
    // alert("called");
    this.selDate = event;
    this.date1 = moment(event).format('DD/MM/YYYY');
    this.date = moment(event).format('YYYY-MM-DD');
    console.log(this.date);

    this.slotservice.getslot(this.dealerId, this.date).subscribe(
      (data: Slot[]) => {
        console.log(data);
        this.slots = data;
        this.slots.forEach(element => {
          element.SlotTime = element.SlotTime.toString().slice(0, -3);
        });
        this.slotCount = this.slots.length
      },
      error => {
        console.log('error' + error);
        alert('Error');
      });
  }

  bookService(SlotTime) {
    this.userdetails.BookingDate = this.date;
    this.userdetails.SlotTime = SlotTime;
    //this.userdetails.Date = this.date;
    localStorage.setItem('UserDetails', JSON.stringify(this.userdetails));
    this._router.navigate(['../booking/summary']);
  }

  getDealerName() {
    this.slotservice.getDealerName(this.dealerId).subscribe(Response => {
      this.dealerName = Response[0];
    },
      error => {
        alert('Error');
        console.log('error' + JSON.stringify(error));
      });
  }
}
