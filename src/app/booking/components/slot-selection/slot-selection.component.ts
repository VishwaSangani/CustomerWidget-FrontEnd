import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { FormControl } from '@angular/forms';
import { SlotService } from 'src/app/shared/services/slot.service';
import { Slot } from 'src/app/shared/models/slot';


const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-slot-selection',
  templateUrl: './slot-selection.component.html',
  styleUrls: ['./slot-selection.component.scss']
})
export class SlotSelectionComponent implements OnInit {

  date = null;
  date1=null;
  Dealername;
  dealerId = 1;
  slots: Slot[] = [];
  // slots = [
  //   {
  //     id: 1,
  //     time: '10:00',
  //     slots: 4
  //   },
  //   {
  //     id: 2,
  //     time: '12:00',
  //     slots: 4
  //   },
  //   {
  //     id: 3,
  //     time: '14:00',
  //     slots: 4
  //   },
  //   {
  //     id: 4,
  //     time: '16:00',
  //     slots: 4
  //   },
  // ];
  constructor(private _router: Router,private slotservice:SlotService) { }


  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  currentDate = new Date(); 
  selDate = new Date(this.currentDate.getFullYear()+'/'+(this.currentDate.getMonth()+1)+'/'+this.currentDate.getDate())
  minDate = new Date(this.currentDate.getFullYear()+'/'+(this.currentDate.getMonth()+1)+'/'+this.currentDate.getDate())
  maxDate = new Date(this.currentDate.getFullYear()+'/'+(this.currentDate.getMonth()+2)+'/'+this.currentDate.getDate())

  ngOnInit(): void {

    console.log(this.selDate);
      this.slotservice.getDealerName(this.dealerId).subscribe(Response=>{
          console.log('dealerName'+Response);
          this.Dealername=Response;
      },
      error=>{
        alert('Error');
        console.log('error'+JSON.stringify(error));
      });

  }

  dateSelected(event) {
   // alert("called");
    this.selDate = event;
    this.date1=moment(event).format('DD/MM/YYYY');
    this.date = moment(event).format('YYYY-MM-DD');
    console.log(this.date);

    this.slotservice.getslot(this.dealerId,this.date).subscribe((data:any[])=>{
    //  console.log('data from api'+JSON.stringify(data));
      this.slots = [];
      for(let item of data)
      {
          this.slots.push(new Slot(item.DealerId,item.Date,item.SlotTime,item.SlotAvailable));    
          //console.log(this.slotts);
      }
     // console.log('array...' + JSON.stringify(this.slotts));
    },
    error=>{
      console.log( 'error' + error);
      alert( 'Error' );
    });
  
  }       


  bookService(SlotTime) {
    //console.log(SlotTime);
    // console.log('BookingDate',this.date1);
    localStorage.setItem('BookingDate',this.date1);
    localStorage.setItem('SlotTime', SlotTime);
    this._router.navigate(['../booking/summary']);
  }
}
