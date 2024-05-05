import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private http: HttpClient) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password:string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn(){
    return this.auth.user;
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get(`/api/check-email?email=${email}`).pipe(
      map((response: any) => response.exists),
      catchError(() => of(false))
    );
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUserId(): string | null {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      return user.uid;
    } else {
      return null;
    }
  }  
}
