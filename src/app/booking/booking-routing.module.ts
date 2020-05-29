import { ConfirmComponent } from './components/confirm/confirm.component';
import { SlotSelectionComponent } from './components/slot-selection/slot-selection.component';
import { DealerSelectionComponent } from './components/dealer-selection/dealer-selection.component';
import { PackageSelectionComponent } from './components/package-selection/package-selection.component';
import { CarSelectionComponent } from './components/car-selection/car-selection.component';
import { ComponentsComponent } from './components/components.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ComponentsComponent,
    children: [
      {
        path: 'selectCar',
        component: CarSelectionComponent
      },
      {
        path: 'packageSelection',
        component: PackageSelectionComponent
      },
      {
        path: 'dealerSelection',
        component: DealerSelectionComponent
      },
      {
        path: 'slotSelection',
        component: SlotSelectionComponent
      },
      {
        path: 'summary',
        component: ConfirmComponent
      },
      {
        path: '',
        redirectTo: 'selectCar',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
