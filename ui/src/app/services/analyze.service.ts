import { Injectable } from '@angular/core';
import seedrandom from 'seedrandom';
import {RandomNumberService} from "./random-number.service";
@Injectable({
  providedIn: 'root'
})
export class AnalyzeService {

  constructor(private randomNumberService:RandomNumberService) { }

  getRandomNumber(max:number):number {
    return Math.floor(this.getRnd().double() * max);
  }

  /**
   * Consuming hotbits for quantum influence
   */
  private getRnd() {
    let hotbitNumber = new Date().getMilliseconds()

    if (this.randomNumberService.hotbits.length > 10) {
      hotbitNumber += this.randomNumberService.hotbits.shift();
    }

    return seedrandom(hotbitNumber);
  }
}
