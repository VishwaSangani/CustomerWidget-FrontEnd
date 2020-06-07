import { CarServiceService } from 'src/app/shared/services/car-service.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserData } from 'src/app/shared/models/UserData';
import { SubSink } from 'Subsink';
import { utf8Encode } from '@angular/compiler/src/util';

@Component({
  selector: 'app-package-selection',
  templateUrl: './package-selection.component.html',
  styleUrls: ['./package-selection.component.scss']
})
export class PackageSelectionComponent implements OnInit, OnDestroy {
  private sub = new SubSink();
  // tslint:disable-next-line: variable-name
  constructor(private _router: Router, private _http: CarServiceService) { }


  userdetails: UserData;
  packages = [
    {
      id: null,
      name: '',
      des: 'Does all the basic stuff'
    },
    {
      id: null,
      name: '',
      des: 'Does all the basic stuff plus some extra to make your car go wroom'
    },
    {
      id: null,
      name: '',
      des: 'Sit back and relax as we do everything we can to make your car just as a new one'
    }
  ];
  packages$ = this._http.getAllPackages();

  ngOnInit(): void {
    this.userdetails = JSON.parse(localStorage.getItem('UserDetails'));
    this.callOnInit();
  }

  callOnInit() {
    this.sub.add(this.packages$.subscribe(item => {
      for (let i = 0; i < item.length ; i++) {
        this.packages[i].id = item[i].ServiceId;
        this.packages[i].name = item[i].ServiceName;
      }
    }));
  }
  packageSelected(item: string, id: number) {
    console.log(`Selected Package: ${item}`);
    this.userdetails.PackageId = id;
    this.userdetails.PackageName = item;
    localStorage.setItem('UserDetails', JSON.stringify(this.userdetails));
    this._router.navigate(['../booking/dealerSelection']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
