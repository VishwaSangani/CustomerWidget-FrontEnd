import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { AdminCalendarService } from 'src/app/shared/services/admin-calendar.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;


  open:boolean = false;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  appointments;
  customerdata;

  showModal = false;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;
  constructor(private calendarservice : AdminCalendarService) { }

  ngOnInit(): void {
    console.table(this.events);
    console.log(subDays(startOfDay(new Date()), 1));
    this.getAppointments(1);
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  } 

  openModal(){
    this.open = true;
  }

  getAppointments(id:number){
      this.calendarservice.getAppointmentId(id).subscribe(
        data =>{
          console.log(data)
          this.appointments = data;
          this.arrangeCalendar(data);
        }
      )
  }

 arrangeCalendar(data){

  data.forEach(element => {

    let displayColor;
   if(element.ServiceId == 1){
      displayColor = colors.blue;
   }
   else if(element.ServiceId == 2){
      displayColor = colors.yellow;
   }
   else{
      displayColor = colors.red;
   }

    var calEntry = {
      start: startOfDay(new Date(element.DateOfBooking)),
      title: element.RegistrationNo,
      color: displayColor,
    }
    this.events.push(calEntry)
  });
 }

 displayData(event){
   this.showModal =true
   console.log(event.event.title)
   this.appointments.forEach(element => {
     if(element.RegistrationNo === event.event.title)
     {
        this.customerdata = element
     }
   });
   console.log(this.customerdata)
 }


  setView(view: CalendarView) {
    this.view = view;
  }

  closeModal(){
    this.showModal = false;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}


