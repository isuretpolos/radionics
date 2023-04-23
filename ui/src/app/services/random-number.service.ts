import { Injectable } from '@angular/core';

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
    if (this.hotbits.length < 50000) {
      this.hotbits.push.apply(this.hotbits, randomNumbers);
    }
  }

}
