import { Component, OnInit } from '@angular/core';
import {RandomNumberService} from "../../services/random-number.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  devices:any[] = [];

  constructor(private randomNumberService:RandomNumberService) { }

  ngOnInit(): void {
    this.devices = this.randomNumberService.devices;
  }

  selectWebcam(cameraLabel: string) {
    localStorage.setItem('webCam',cameraLabel);
  }
}
