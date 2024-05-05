import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';
import { Meter } from '../models/Meter';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collentionUser = "Users";
  collectionMeter = "Meters";

  constructor(private afs: AngularFirestore) {}

  create(user: User){
    return this.afs.collection<User>(this.collentionUser).doc(user.id).set(user);
  }

  async createMeter(meter: Meter){
    meter.lastdata = 0;
    meter.lastdate = new Date();
    const docRef = await this.afs.collection(this.collectionMeter).add(meter);
    meter.meterid = docRef.id;
    await this.afs.collection(this.collectionMeter).doc(docRef.id).update(meter);
    return docRef.id;
  }
}
