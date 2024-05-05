import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialIndicatorRoutingModule } from './dial-indicator-routing.module';
import { DialIndicatorComponent } from './dial-indicator.component';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DialIndicatorComponent
  ],
  imports: [
    CommonModule,
    DialIndicatorRoutingModule,
    MatCardModule,
    MatIcon,
    MatListModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule
  ]
})
export class DialIndicatorModule { }
