import { Component, OnInit } from '@angular/core';
import {AnalyzeService} from "../../services/analyze.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  randomNumber:number|undefined;

  constructor(private analyzeService:AnalyzeService) { }

  ngOnInit(): void {
  }


  getRandomNumberBetween1and1000() {
    this.randomNumber = this.analyzeService.getRandomNumber(1000)
  }
}
