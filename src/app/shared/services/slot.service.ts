import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Slot } from '../models/slot';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  // private baseurl: string = 'http://localhost:59699/api/';
   private baseurl:string = ' http://127.0.0.1:8080/api/';

  constructor(private http: HttpClient) { }


  getslot(dealerId,date)
  {
   // console.log('url:....' + this.baseurl + 'GetAvailableSlots?DealerId='+dealerId+'&BookingDate='+date);
   // console.log('service..'+JSON.stringify(this.http.get<Slot[]>(this.baseurl + 'GetAvailableSlots?DealerId='+dealerId+'&BookingDate='+date)));
      return this.http.get(this.baseurl + 'GetAvailableSlots?DealerId='+dealerId+'&BookingDate='+date);
  }

  getDealerName(dealerId)
  {
      //console.log('getDealerurl..'+this.baseurl+'Slots/PostSlot?dealerId='+dealerId);
     // console.log(this.http.post (this.baseurl+'Slots/PostSlot?dealerId='+dealerId,dealerId ));
      return this.http.post (this.baseurl+'Slots/PostSlot?dealerId='+dealerId,dealerId );
  }

}
