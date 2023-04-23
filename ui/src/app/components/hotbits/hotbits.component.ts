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

      if (randomInt > 0) {
        randomNumbers.push(randomInt);
      }
    }

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
