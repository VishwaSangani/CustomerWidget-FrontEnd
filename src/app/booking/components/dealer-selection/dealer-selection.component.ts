import { SubSink } from 'Subsink';
import { from } from 'rxjs';
import { CarServiceService } from 'src/app/shared/services/car-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserData } from 'src/app/shared/models/UserData';

@Component({
  selector: 'app-dealer-selection',
  templateUrl: './dealer-selection.component.html',
  styleUrls: ['./dealer-selection.component.scss']
})
export class DealerSelectionComponent implements OnInit, OnDestroy {
  private sub = new SubSink();
  // tslint:disable-next-line: variable-name
  constructor(private _router: Router, private _http: CarServiceService) { }

  userdetails: UserData;
  dealerList;
  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails'));
    this.getPackages();
  }

  getPackages() {
    const dealerList$ = this._http.getDealers(this.userdetails.PackageId)
      .subscribe(item => {
        console.table(item);
        this.dealerList = item;
      });
    this.sub.add(dealerList$);
  }

  dealerSelected(id) {
    console.log(id);
    this.userdetails.DealerId = id;
    localStorage.setItem('UserDetails', JSON.stringify(this.userdetails));
    this._router.navigate(['../booking/slotSelection']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
