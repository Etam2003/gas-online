import { Component } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { AuthService } from '../../shared/services/auth.service';
import { Tipp } from '../../shared/models/Tipp';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {
  location: any;
  meterData: any;
  formattedDate: string | undefined;
  formattedPDate: string | undefined;
  tips: Tipp[] = [];
  gasprice = 99.9;
  price: number | undefined;
  paymentDate: any;
  secondsIn30Days = 30 * 24 * 60 * 60;
  actualMeter: any;
  invoiceNumber: string | undefined = this.generateInvoiceNumber();
  payDay: number | undefined;
  most: any;
  loc: any;

  constructor(private db: DatabaseService, private auth: AuthService) {
    this.db.findUserWithMostGasConsumption().subscribe((data: any[]) => {
      this.most = (data[0].lastdata);
    });

    this.db.findUserWithMostGasConsumptionlocation().subscribe((datal: any[]) => {
      this.loc = (datal[0].location.city);
    });
    
  }

ngOnInit() {
  const userId = this.auth.getCurrentUserId();
  if (userId) {
    this.db.readUser(userId).subscribe(user => {
      this.location = user?.location;
      if (user?.location?.meters) {
        this.db.readMeter(user?.location?.meters).subscribe(meter => {
          this.meterData = meter;
          const timestamp = this.meterData?.lastdate;
          const date = timestamp.toDate();
          let payDate = timestamp;
          payDate.seconds += this.secondsIn30Days;
          payDate = timestamp.toDate()
          this.formattedDate = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
          this.formattedPDate = payDate.getFullYear() + "." + (payDate.getMonth() + 1) + "." + payDate.getDate();
          const today = new Date();
          const paymentDateObj = new Date(payDate);
          const differenceInTime = paymentDateObj.getTime() - today.getTime();
          const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
          this.payDay = differenceInDays; this.price = Math.round(this.meterData.lastdata * this.gasprice);
        });
      }
    });
  }
  const tip1 = new Tipp("Energiahatékonysági tippek", "Használjon energiatakarékos háztartási gépeket.", new Date(), 8);
  const tip2 = new Tipp("Szigetelési tanácsok", "Szigetelje házát megfelelően, hogy minimalizálja az energia veszteségeket.", new Date(), 9);
  const tip3 = new Tipp("Levegőminőség javítás", "Gyakran szellőztesse ki a lakást, hogy javítsa a levegő minőségét.", new Date(), 7);

  this.tips.push(tip1, tip2, tip3);
}

buy() {
  this.db.updateBuy(this.location.meters);
  this.invoiceNumber = this.generateInvoiceNumber();
}

generateInvoiceNumber(): string {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
}
