import { NgModule } from '@angular/core';


import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
    imports: [MatInputModule, MatButtonModule, MatCardModule, MatGridListModule, MatToolbarModule, MatIconModule, MatDatepickerModule],
    exports: [MatInputModule, MatButtonModule, MatCardModule, MatGridListModule, MatToolbarModule, MatIconModule, MatDatepickerModule]
})

export class MaterialModules { }
