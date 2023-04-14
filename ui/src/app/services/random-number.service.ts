import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

  hotbits:number[] = [];

  constructor() {
  }

  async addHotbits(randomNumbers:number[]) {
    console.log(this.hotbits.length)
    if (this.hotbits.length < 50000) {
      this.hotbits.push.apply(this.hotbits, randomNumbers);
    }
  }

}
