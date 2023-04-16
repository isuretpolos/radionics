import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RandomNumberService} from "../../services/random-number.service";

@Component({
  selector: 'app-hotbits',
  templateUrl: './hotbits.component.html',
  styleUrls: ['./hotbits.component.scss']
})
export class HotbitsComponent implements OnInit {

  @ViewChild('video') videoElement: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasElement: ElementRef<HTMLCanvasElement>;
  lastRandomNumber:number = 0;
  hotbitsLength:number = 0;
  constructor(private randomNumbersService:RandomNumberService) { }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setupWebcam();
  }

  private async setupWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.videoElement.nativeElement.srcObject = stream;
    this.videoElement.nativeElement.play();
    this.updateCanvas();
    document.querySelector('canvas').style.display="none";
    document.querySelector('video').style.display="none";
  }

  private updateCanvas() {

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const randomNumbers = [];
    for (let i = 0; i < data.length; i += 4) {

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const randomValue = ((r << 16) | (g << 8) | b) / (0xffffff + 1);
      const randomInt = Math.floor(randomValue * Number.MAX_SAFE_INTEGER);

      if (i == 0 && this.lastRandomNumber == randomInt) {
        break;
      }

      if (i == 0) {
        this.lastRandomNumber = randomInt;
      }

      randomNumbers.push(randomInt);
    }

    this.randomNumbersService.addHotbits(randomNumbers);
    this.hotbitsLength = this.randomNumbersService.hotbits.length;
    requestAnimationFrame(() => this.updateCanvas());
  }

  showWebCam() {
    document.querySelector('canvas').style.display="block";
    document.querySelector('video').style.display="block";
  }

}
