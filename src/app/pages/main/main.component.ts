import { Component } from '@angular/core';
import { DatabaseService } from '../../shared/services/database.service';
import { AuthService } from '../../shared/services/auth.service';
import { Promotion } from '../../shared/models/Promotion';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  location: any;
  meterData: any;
  articles: Promotion[] = [
    new Promotion(
      "Biztosítások az MVM-től",
      "../../../assets/MVMbiztositasok.jpg",
      "Az Otthon Biztosítás termékcsaláddal többé nem kell aggódnia a váratlan helyzetekből adódó kiadások miatt.",
      "https://www.mvmbiztositas.hu"
    ),
    new Promotion(
      "Napenergia Plusz Program",
      "../../../assets/Napenergiaplusz.jpg",
      "Napelem energiatárolóval akár 5 millió Ft vissza nem térítendő támogatással, amely a rendszer árának akár 66%-át is fedezheti. Ne maradjon le róla!",
      "https://mvmoptimum.hu/napenergia-plusz-program-eloregisztracio/?utm_source=app&amp;utm_medium=banner&amp;utm_campaign=napenergiapluszeloreg"
    ),
    new Promotion(
      "Töltődjön fel otthon is az MVM-mel!",
      "../../../assets/Toltodjonfelotthon.jpg",
      "Az MVM Next webshopjában is megvásárolhatók az otthoni elektromosautó-töltők, kiegészítők.",
      "https://www.mvmnextshop.hu"
    ),
    new Promotion(
      "Parkolj kényelmesen a Mobiliti appal!",
      "../../../assets/Mobilitiparkolasi.jpg",
      "A Magyarországon érvényes e-matrica vásárlása és a kényelmes parkolás minden autós számára elengedhetetlen, ezekre a Mobiliti app biztonságos és gyors megoldást kínál. Ismerd meg, mit tud az appunk, és garantáljuk, hogy szeretni fogod!",
      "https://www.mobiliti.hu/plusz/mobil-parkolas"
    )
  ];

  constructor(private db: DatabaseService, private auth: AuthService, private user: UserService) { }

  ngOnInit(): void {
      const userId = this.auth.getCurrentUserId();
       if (userId) {
      this.db.readUser(userId).subscribe(user => {
        this.location = user?.location;
        if (user?.location?.meters) {
          this.db.readMeter(user?.location?.meters).subscribe(meter =>{
            this.meterData = meter
          });
        }
      });
    }
  }

  openUrl(url: string, event: Event): void {
    event.preventDefault();
    window.open(url, '_blank');
  }

  delete() {
    const userId = this.auth.getCurrentUserId();
    const meterId = this.meterData?.meterid;
    if (userId !== null && meterId !== undefined) {
      this.db.deleteAll(userId, meterId);
    } else {
      console.error("Hiba: UserId vagy meterId null vagy undefined értéket ad vissza.");
    }
  }
}
