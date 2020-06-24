import { MaterialModules } from './../shared/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DateAdapter, CalendarModule } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { ComponentsComponent } from './components/components.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}


@NgModule({
  declarations: [ComponentsComponent, CalendarComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MaterialModules,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory })
  ],
  exports: [
    MatToolbarModule
  ]
})
export class AdminModule { }
