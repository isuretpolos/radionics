import { Injectable } from '@angular/core';
import {Rate} from "../domains/AnalysisResult";

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

  hotbits:number[] = [];
  devices:any[] = [];

  constructor() {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      // Filter for video inputs (webcams)
      this.devices = devices.filter(device => device.kind === 'videoinput');
      console.log(this.devices)
    }).catch(error => console.error(error));
  }

  async addHotbits(randomNumbers:number[]) {

    let entropyRate = this.entropy(randomNumbers);
    //let entropyRate2 = this.entropy(this.hotbits);
    if (entropyRate < 10) return;
    //console.log(`${entropyRate} vs ${entropyRate2}`)

    if (this.hotbits.length < 90000) {
      this.hotbits.push.apply(this.hotbits, this.shuffleHotbits(randomNumbers));
    }
  }

  entropy(trng: number[]): number {
    const n = trng.length;
    const freq: Record<number, number> = {};
    let entropy = 0;

    // Count frequency of each value
    for (const x of trng) {
      if (x in freq) {
        freq[x]++;
      } else {
        freq[x] = 1;
      }
    }

    // Calculate probability and entropy for each value
    for (const x of Object.keys(freq)) {
      const p = freq[x] / n;
      entropy += -p * Math.log2(p);
    }

    return entropy;
  }

  shuffleHotbits(trngs:number[]):number[] {
    let currentIndex = trngs.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [trngs[currentIndex], trngs[randomIndex]] = [
        trngs[randomIndex], trngs[currentIndex]];
    }

    return trngs;
  }

}
