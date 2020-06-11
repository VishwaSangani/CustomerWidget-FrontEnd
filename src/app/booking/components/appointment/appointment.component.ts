import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/shared/models/UserData';
import { AppointmentService } from 'src/app/shared/services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  userdetails: UserData;
  appointmentdetail;
  date=new Date();
  constructor(private appointment:AppointmentService) { }

  ngOnInit(): void {
    //console.log(this.date);
  this.getappointment();
  }

  getappointment()
  {
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails'));
    console.log(this.userdetails.Email);
    this.appointment.getAppointmentDetail(this.userdetails.Email).subscribe(data=>{
      console.table(data);
      this.appointmentdetail = data;
    },
    error=>{
      console.log('Error',JSON.stringify(error));
      alert('Error');
    }) ;
  }


}
