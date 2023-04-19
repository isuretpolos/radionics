import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AnalyzeService} from "../../services/analyze.service";
import * as p5 from 'p5';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild('broadcastCanvas', {static: false, read: ElementRef}) canvasRef: ElementRef;
  private p5Instance: p5 | null = null;
  randomNumber:number|undefined;

  constructor(private analyzeService:AnalyzeService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.p5Instance = new p5(this.sketch, this.canvasRef.nativeElement);
    }, 1000);
  }

  sketch(p: p5): void {
    p.setup = () => {
      p.createCanvas(400, 400);
    };

    p.draw = () => {
      p.background(200);
      p.circle(p.width / 2, p.height / 2, 100);
    };
  }

  getRandomNumberBetween1and1000() {
    this.randomNumber = this.analyzeService.getRandomNumber(1000)
  }
}
