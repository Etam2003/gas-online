import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Meter } from '../../shared/models/Meter';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), this.passwordValidator]),
    rePassword: new FormControl("", [Validators.required]),
    name: new FormGroup({
      lastname: new FormControl(""),
      firstname: new FormControl(""),
    }),
    location: new FormGroup({
      zipcode: new FormControl(""),
      city: new FormControl(""),
      street: new FormControl(""),
      streetNumber: new FormControl(""),
    })
  });

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
      return { invalidPassword: true };
    }
    return null;
  }

  ngOnInit() {}

  onSubmit() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
  
    if (!email || !password) {
      this.router.navigateByUrl("/login");
      return;
    }
  
    this.authService.signup(email, password).then(cred => {
      this.router.navigateByUrl("/main");
      const meter: Meter ={
        meterid: '',
        lastdate: new Date(),
        lastdata: 0
      }
      this.userService.createMeter(meter).then(meterId => {
        const user: User = {
          id: cred.user?.uid as string,
          email: this.signUpForm.get('email')?.value as string,
          username: this.signUpForm.get('email')?.value?.split('@')[0] as string,
          name: {
            lastname: this.signUpForm.get('name.lastname')?.value as string,
            firstname: this.signUpForm.get('name.firstname')?.value as string,
          },
          location: {
            zipcode: this.signUpForm.get('location.zipcode')?.value as string,
            city: this.signUpForm.get('location.city')?.value as string,
            street: this.signUpForm.get('location.street')?.value as string,
            streetNumber: this.signUpForm.get('location.streetNumber')?.value as string,
            meters: meterId
          }
        };
        this.userService.create(user).then(_ => {
        }).catch( error =>{
          console.error(error);
        });
        this.router.navigateByUrl("/main");
      }).catch( error =>{
        console.error(error);
      });
    }).catch(error => {
      if (error.code === 'auth/invalid-email') {
        alert("Az e-mail cím formátuma nem megfelelő!");
        this.router.navigateByUrl("/login");
      } else if (error.code === 'auth/email-already-in-use') {
        alert("Ez az e-mail cím már használatban van egy másik fióknál!");
      } else if (error.code === 'auth/weak-password') {
        alert("A jelszó nem megfelelően erős! Használjon legalább 6 karakterből álló jelszót.");
      } else {
        alert("Valami hiba történt!");
      }
      console.error = function() {};
    });
  }

}  
