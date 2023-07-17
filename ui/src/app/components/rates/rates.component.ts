import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  signature = new FormControl('');
  rateBase10:number[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.queerSum(12))
  }

  transformToRate() {
    let affirmation = this.signature.getRawValue();
    this.rateBase10 = this.affirmationToRadionicsRate(affirmation, 5);
  }

  affirmationToRadionicsRate(affirmation:string, dials:number):number[] {

    const words = affirmation.split(" ");
    const numericValues = [];

    for (let word of words) {
      let numericValue = 0;
      for (let i = 0; i < word.length; i++) {
        numericValue += word.charCodeAt(i) * (i + 1);
      }
      if (numericValue > 9) {
        numericValue = this.queerSum(numericValue);
      }
      numericValues.push(this.queerSum(numericValue));
    }

    return numericValues;
  }

  countDigits(number: number): number {
    const numberString: string = Math.abs(number).toString();
    return numberString.length;
  }

  queerSum(num) {
    let sum = 0;
    let rest = num;
    while (rest > 0) {
      let einer = rest % 10;
      sum = sum + einer;
      rest = (rest - einer)/10;
    }
    if (sum > 1000) sum = this.queerSum(sum);
    return sum;
  }
}
