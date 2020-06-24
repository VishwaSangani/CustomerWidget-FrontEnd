import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ComponentsComponent } from './components/components.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'admin-login',
        component: AdminLoginComponent
      },
      {
        path: '**',
        redirectTo: 'admin-login',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
