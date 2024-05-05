import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldControl } from '@angular/material/form-field';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [{ provide: MatFormFieldControl, useExisting: LoginComponent }]

})
export class LoginComponent {

  email = new FormControl('', [Validators.email]);
  password = new FormControl('');

  constructor(private router: Router, private authService: AuthService){}

  login(){
    this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
      this.router.navigateByUrl('/main');
    }).catch(error => {
      if (error.code === 'auth/invalid-email') {
        alert("Az e-mail formátuma nem megfelelő!");
        this.router.navigateByUrl("/login");
      }
      if (error.code === 'auth/invalid-credential') {
        alert("Az e-mail és a jelszó nem megfelelő!");
        this.router.navigateByUrl("/login");
      }
      console.error = function() {};
    });
  }
}
