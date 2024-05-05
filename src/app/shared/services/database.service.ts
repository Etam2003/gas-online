import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { User } from '../models/User';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Meter } from '../models/Meter';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  collectionUser = "Users";
  collectionMeter = "Meters";


  constructor(private afs: AngularFirestore, private auth: AngularFireAuth, private router: Router) { }

  readUser(userId: string): Observable<User | undefined> {
    return this.afs.collection<User>(this.collectionUser).doc(userId).valueChanges()
      .pipe(
        map(user => {
          if (user) {
            return user as User;
          } else {
            return undefined;
          }
        })
      );
  }

  readMeter(meterId: string): Observable<Meter | undefined> {
    return this.afs.collection<Meter>(this.collectionMeter).doc(meterId).valueChanges()
    .pipe(
      map(meter => {
        if (meter) {
          return meter as Meter;
        } else {
          return undefined;
        }
      })
    );
  }

  updateMeter(meterId: string, newdata: number): Promise<void> {
    const meterRef = this.afs.collection<Meter>(this.collectionMeter).doc(meterId);
    const currentDate = new Date();
    return meterRef.update({ 
      lastdata: newdata,
      lastdate: currentDate
    });
  }

  updateBuy(meterId: string): Promise<void>{
    const currentDate = new Date();
    const meterRef = this.afs.collection<Meter>(this.collectionMeter).doc(meterId);
    return meterRef.update({ 
      lastdata: 0,
      lastdate: currentDate
    });
  }

  async deleteAll(userId: string, meterId: string) {
    await this.afs.collection(this.collectionMeter).doc(meterId).delete();

    await this.afs.collection(this.collectionUser).doc(userId).delete();

    const user = firebase.auth().currentUser;
    if(user != null){
      user.delete().then(() => {
      }).catch((error) => {
        console.error(error);
      }); 
    }
    this.router.navigateByUrl('/login');
   }

   findUserWithMostGasConsumption() {
    return this.afs.collection(this.collectionMeter, ref => ref.orderBy("lastdata", "desc").limit(1)).valueChanges();
  }

  findUserWithMostGasConsumptionlocation(): Observable<any> {
    return this.afs.collection(this.collectionMeter, ref => ref.orderBy("lastdata", "desc").limit(1)).valueChanges()
      .pipe(
        switchMap((meterData: any) => {
          const meterId = meterData[0].meterid;
          return this.afs.collection(this.collectionUser, ref => ref.where("location.meters", "==", meterId)).valueChanges();
        })
      );
  }
  
  

}
