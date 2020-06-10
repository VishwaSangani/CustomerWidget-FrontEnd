import { MaterialModules } from './../shared/material';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingRoutingModule } from './booking-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ComponentsComponent } from './components/components.component';
import { CarSelectionComponent } from './components/car-selection/car-selection.component';
import { PackageSelectionComponent } from './components/package-selection/package-selection.component';
import { DealerSelectionComponent } from './components/dealer-selection/dealer-selection.component';
import { SlotSelectionComponent } from './components/slot-selection/slot-selection.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { ConfirmComponent } from './components/confirm/confirm.component';
import { UserprofileComponent } from './userprofile/userprofile.component';


@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    NavbarComponent,
    ComponentsComponent,
    CarSelectionComponent,
    PackageSelectionComponent,
    DealerSelectionComponent,
    SlotSelectionComponent,
    ConfirmComponent,
    UserprofileComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialModules,
    MatNativeDateModule,
    NgbModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [MatDatepickerModule,DatePipe]
})
export class BookingModule { }
