export class Tipp {
    cim: string; 
    tartalom: string;
    datum: Date;
    ertekeles: number;
  
    constructor(cim: string, tartalom: string, datum: Date, ertekeles: number) {
      this.cim = cim;
      this.tartalom = tartalom;
      this.datum = datum;
      this.ertekeles = ertekeles;
    }
  
    teljesTipp(): string {
      return `${this.cim} (${this.datum.toLocaleDateString()}): ${this.tartalom} | Értékelés: ${this.ertekeles}/10`;
    }
  }
  