import {Component, OnInit} from '@angular/core';
import * as p5 from 'p5';
import {FormControl} from "@angular/forms";
import {AnalyzeService} from "../../services/analyze.service";

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {

  rate = new FormControl('');
  diagram: number[] = [];
  pointer: number = 0;

  constructor(private analyzeService: AnalyzeService) {
  }

  ngOnInit(): void {
    const sketch = (s) => {

      s.preload = () => {
        // preload code
      }

      s.setup = () => {
        s.createCanvas(400, 400).parent('analog-clock-canvas');
        s.background(0);
      };

      s.draw = () => {

        s.fill(255)
        /*if (this.diagram[this.pointer]) {
          this.diagram[this.pointer] = this.diagram[this.pointer] + this.analyzeService.getRandomNumber(200);
        } else {
          this.diagram[this.pointer] = this.analyzeService.getRandomNumber(200);
        }

        if (this.diagram[this.pointer] > 390) {
          this.diagram = [];
        }


        this.diagram.forEach((value, index) => {
          s.line(index, 400, index, 400 - value);
        })

        this.pointer = this.pointer + 1;
        if (this.pointer >= 400) this.pointer = 0;
*/
        if (this.rate.value) {
          let x = this.analyzeService.getRandomNumber(400);
          let y = this.analyzeService.getRandomNumber(400);

          s.text(this.rate.value, x, y)
        }

      };
    }

    let canvas = new p5(sketch);
  }

  broadcast() {

  }
}
