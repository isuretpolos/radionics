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
    return seedrandom(this.randomNumberService.hotbits.shift() + new Date().getMilliseconds());
  }
}
