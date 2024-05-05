import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialIndicatorComponent } from './dial-indicator.component';

const routes: Routes = [
  { path: '', component: DialIndicatorComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialIndicatorRoutingModule { }
