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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { ConfirmComponent } from './components/confirm/confirm.component';
<<<<<<< HEAD
import { UserprofileComponent } from './components/userprofile/userprofile.component';
=======
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
>>>>>>> fc3b4b56b01feee6d4cd8ec39015aaf7e7e4e9e1


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
    UserprofileComponent,
    AppointmentComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    MaterialModules,
    MatNativeDateModule,
    NgbModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [MatDatepickerModule,DatePipe]
})
export class BookingModule { }
