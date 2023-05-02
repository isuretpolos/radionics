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
  lastRandomNumber: number = 0;
  hotbitsLength: number = 0;
  cameraOn = false;
  selectedDevice: any;
  cycle:number = 0;
  imageDataArray:any[] = [];

  constructor(private randomNumberService: RandomNumberService) {
  }


  ngOnInit(): void {
    this.selectedDevice = localStorage.getItem('webCam')
  }

  ngAfterViewInit() {
    document.querySelector('canvas').style.display = "none";
    document.querySelector('video').style.display = "none";
  }

  private async setupWebcam() {

    if (!this.selectedDevice) {
      return
    }

    let deviceId = this.randomNumberService.devices.filter(device => device.label == this.selectedDevice)[0].deviceId;
    const constraints = {video: {deviceId: {exact: deviceId}}};

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        console.log(stream)
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.play();
        this.cameraOn = true;
        this.randomNumberService.webCamOn = true;
        this.updateCanvas();
      })
      .catch(error => console.error(error));
  }

  private async stopWebcam() {
    let deviceId = this.randomNumberService.devices.filter(device => device.label == this.selectedDevice)[0].deviceId;
    const constraints = {video: {deviceId: {exact: deviceId}}};

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        console.log("stop webcam")
        stream.getTracks().forEach(track => track.stop());
        this.cameraOn = false;
        stream = null;
        this.videoElement.nativeElement.srcObject = null;
      })
      .catch(error => console.error(error));
  }

  private updateCanvas() {

    if (!this.cameraOn) return;

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const randomNumbers = [];
    let binaryString = "";

    if (this.cycle == 0) {
      this.imageDataArray.push(data);
      this.cycle = 1;
      requestAnimationFrame(() => this.updateCanvas());
      return;
    }

    if (this.cycle == 1) {
      this.imageDataArray.push(data);
      this.cycle = 0;
    }

    for (let i = 0; i < data.length; i += 4) {

      const r1 = this.imageDataArray[0][i];
      const g1 = this.imageDataArray[0][i + 1];
      const b1 = this.imageDataArray[0][i + 2];
      const r2 = this.imageDataArray[1][i];
      const g2 = this.imageDataArray[1][i + 1];
      const b2 = this.imageDataArray[1][i + 2];

      if (r1 > r2) {
        binaryString += "1"
      } else if (r1 < r2) {
        binaryString += "0"
      }

      if (g1 > g2) {
        binaryString += "1"
      } else if (g1 < g2) {
        binaryString += "0"
      }

      if (b1 > b2) {
        binaryString += "1"
      } else if (b1 < b2) {
        binaryString += "0"
      }

      if (binaryString.length >= 30) {
        let randomInt = parseInt(binaryString.substring(0,32), 2);
        binaryString = "";

        if (i == 0) {
          this.lastRandomNumber = randomInt;
        }

        if (randomInt > 0) {
            randomNumbers.push(randomInt);
        }
      }
    }

    this.imageDataArray = [];
    this.randomNumberService.addHotbits(randomNumbers);
    this.hotbitsLength = this.randomNumberService.hotbits.length;
    requestAnimationFrame(() => this.updateCanvas());
  }

  showWebCam() {
    document.querySelector('canvas').style.display = "block";
    document.querySelector('video').style.display = "block";
  }

  switchCamera() {
    if (this.cameraOn) {
      this.stopWebcam();
      location.reload();
    } else {
      this.setupWebcam();
    }
  }
}
