import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillRoutingModule } from './bill-routing.module';
import { BillComponent } from './bill.component';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    BillComponent
  ],
  imports: [
    CommonModule,
    BillRoutingModule,
    MatCardModule,
    MatIcon,
    MatListModule
  ]
})
export class BillModule { }
