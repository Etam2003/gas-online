import { Component } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dial-indicator',
  templateUrl: './dial-indicator.component.html',
  styleUrls: ['./dial-indicator.component.scss']
})
export class DialIndicatorComponent {
  location: any;
  meterData: any;
  formattedDate: string | undefined;
  actualdata = new FormControl('');

  constructor(private db: DatabaseService, private auth: AuthService, private router: Router) { }

  ngOnInit(){
    const userId = this.auth.getCurrentUserId();
    if (userId) {
      this.db.readUser(userId).subscribe(user => {
        this.location = user?.location;
        if (user?.location?.meters) {
          this.db.readMeter(user?.location?.meters).subscribe(meter =>{
            this.meterData = meter;
            const timestamp = this.meterData?.lastdate;
            const date = timestamp.toDate();
            this.formattedDate = date.toLocaleString();
          });
        }
      }); 
    }
  }

  sendData() {
    const value = parseInt(this.actualdata.value as string);
    if (isNaN(value)){
      alert("Megfelő adatot adj meg!");
      this.actualdata.reset();
    }
    else if (!isNaN(value) && value < 0) {
      alert("Nem lehet negatív számot megadni!");
      this.actualdata.reset();
    } 
    else if (value < this.meterData?.lastdata){
      alert("A jelenleg bediktált mérőóra állása kisebb, mint az előző adat!");
      this.router.navigateByUrl('/dial-indicator');
      this.actualdata.reset();
    }
    
    else {
      this.db.updateMeter(this.meterData?.meterid, value).then(() => {
        this.router.navigateByUrl('/dial-indicator');
        this.actualdata.reset();
      });
    }
  }
  
  
}
