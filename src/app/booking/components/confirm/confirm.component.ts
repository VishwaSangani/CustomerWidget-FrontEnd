import { DisplaySummary } from './../../../shared/models/Summary';
import { Component, OnInit } from '@angular/core';
import { Summary, PostSummary } from 'src/app/shared/models/Summary';
import { UserData } from 'src/app/shared/models/UserData';
import { SummaryService } from 'src/app/shared/services/summary.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  userdetails: UserData;

  constructor(
    private summaryservice: SummaryService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  details: DisplaySummary = {
    customerName: '',
    carName: '',
    CarNo: null,
    package: '',
    dealer: '',
    address: '',
    date: null,
    time: null,
    services: '',
    price: null,
    contact: ''
  };

  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails'));
    this.details.time = this.userdetails.SlotTime,
      this.details.date = this.userdetails.BookingDate,
      this.loadSummary();
  }

  loadSummary() {
    const summary: Summary = {
      Email: this.userdetails.Email,
      DealerId: this.userdetails.DealerId,
      CarId: this.userdetails.CarId,
      PackageId: this.userdetails.PackageId,
    };
    this.summaryservice.getSummary(summary).subscribe(
      data => {
        this.details.customerName = data[0].FirstName + ' ' + data[0].LastName;
        this.details.carName = data[0].BrandName + ' ' + data[0].Model;
        this.details.CarNo = data[0].RegistrationNo;
        this.details.dealer = data[1].DealerName;
        this.details.address = data[1].Address + ', ' + data[1].City;
        this.details.package = data[1].ServiceName;
        this.details.services = data[1].Description;
        this.details.price = data[1].Price;
        this.details.contact = data[1].ContactNo;
      },
      error => {
        console.log('Error is :' + JSON.stringify(error));
      });

  }

  save() {
    const postsummary: PostSummary = {
      Email: this.userdetails.Email,
      DealerId: this.userdetails.DealerId,
      CarId: this.userdetails.CarId,
      PackageId: this.userdetails.PackageId,
      dateOfbooking: this.datePipe.transform(this.details.date, 'yyyy-dd-MM'),
      slotTime: this.details.time
    };

    this.summaryservice.postSummary(postsummary).subscribe(
      () => {
        this.router.navigate(['/booking']);
      },
      (error: HttpErrorResponse) => {
        alert(error.error);
      });
  }

}
