import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';


const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),canActivate: [AuthGuard]},
  { path: 'bill', loadChildren: () => import('./pages/bill/bill.module').then(m => m.BillModule), canActivate: [AuthGuard]},
  { path: 'dial-indicator', loadChildren: () => import('./pages/dial-indicator/dial-indicator.module').then(m => m.DialIndicatorModule), canActivate: [AuthGuard]},
  { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '', redirectTo: '/login', pathMatch:'full'},
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
