import { Component, OnInit } from '@angular/core';
import {AnalyzeService} from "../../services/analyze.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  randomImage:number = 1;

  constructor(private analyzeService:AnalyzeService) { }

  ngOnInit(): void {
    this.randomImage = this.analyzeService.getRandomNumber(8) + 1;
  }

}
