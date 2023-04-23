import {Injectable} from '@angular/core';
import seedrandom from 'seedrandom';
import {RandomNumberService} from "./random-number.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AnalysisResult, Rate} from "../domains/AnalysisResult";

@Injectable({
  providedIn: 'root'
})
export class AnalyzeService {

  constructor(private randomNumberService:RandomNumberService, private http:HttpClient) { }

  getRandomNumber(max:number):number {
    return Math.floor(this.getRnd().double() * max);
  }

  analyze(rateListName:string):Observable<AnalysisResult> {
    return new Observable<AnalysisResult>((observer) => {

      this.http.get(`assets/data/${rateListName}`, { responseType: 'text' }).subscribe( async rateList => {

        let rates: Rate[] = [];

        rateList.split(/[\r\n]+/).forEach(r => {
          let rate = new Rate();
          if (r.indexOf("\t") > 0) {
            rate.name = r.split(/[\t]+/)[0];
            rate.url = r.split(/[\t]+/)[1];
          } else {
            rate.name = r;
          }

          rates.push(rate)
        });

        rates = this.shuffleRateList(rates);

        let max = 1000;
        let analysisResult = new AnalysisResult();

        while (analysisResult.maxEV < max) {

          if (this.randomNumberService.hotbits.length < 10000) {
            console.log(`delay ...  ${this.randomNumberService.hotbits.length}`)
            await this.delay(1000);
          } else {
            for (const rate of rates) {
              if (this.randomNumberService.hotbits.length < 10000) {
                console.log(`delay again ...  ${this.randomNumberService.hotbits.length}`)
                await this.delay(1000);
              }
              rate.energeticValue += this.getRandomNumber(10);
              if (rate.energeticValue > analysisResult.maxEV) {
                analysisResult.maxEV = rate.energeticValue
              }
            }
          }
        }

        analysisResult.gv = this.checkGeneralVitalityValue()
        rates.sort((a, b) => b.energeticValue - a.energeticValue);
        analysisResult.rates = rates.slice(0, 20);
        analysisResult.rates.forEach(rate => {
          rate.gv = this.checkGeneralVitalityValue()
          if (analysisResult.minGV == 0) {
            analysisResult.minGV = rate.gv
          }
          if (analysisResult.minGV > rate.gv) {
            analysisResult.minGV = rate.gv
          }
          if (rate.gv > analysisResult.maxGV) {
            analysisResult.maxGV = rate.gv
          }
          if (analysisResult.minEV == 0) {
            analysisResult.minEV = rate.energeticValue
          }
          if (analysisResult.minEV > rate.energeticValue) {
            analysisResult.minEV = rate.energeticValue
          }
        })
        observer.next(analysisResult)
      })

    });
  }

  shuffleRateList(rates:Rate[]):Rate[] {
    let currentIndex = rates.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [rates[currentIndex], rates[randomIndex]] = [
        rates[randomIndex], rates[currentIndex]];
    }

    return rates;
  }

  checkGeneralVitalityValue():number {

    let list:number[] = [];
    for (let i = 0; i < 3; i++) {
      list.push(this.getRandomNumber(1000));
    }
    list.sort((a,b) => b - a)
    let gv = list[0];

    if (gv > 950) {
      let randomDice = this.getRandomNumber(100);

      while (randomDice >= 50) {
        gv += randomDice;
        randomDice = this.getRandomNumber(100);
      }
    }

    return gv;
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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
