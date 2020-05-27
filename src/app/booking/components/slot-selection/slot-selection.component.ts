import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { FormControl } from '@angular/forms';


const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-slot-selection',
  templateUrl: './slot-selection.component.html',
  styleUrls: ['./slot-selection.component.scss']
})
export class SlotSelectionComponent implements OnInit {

  date = null;

  slots = [
    {
      id: 1,
      time: '10:00',
      slots: 4
    },
    {
      id: 2,
      time: '12:00',
      slots: 4
    },
    {
      id: 3,
      time: '14:00',
      slots: 4
    },
    {
      id: 4,
      time: '16:00',
      slots: 4
    },
  ];
  constructor(private _router: Router) { }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  ngOnInit(): void {
  }

  dateSelected(event) {
    this.date = moment(event.value).format('DD/MM/YYYY');
    console.log(this.date);
  }

  bookService() {
    this._router.navigate(['../booking/summary']);
  }
}
