import { Component, OnInit } from '@angular/core';
import { EnvironmentalSensingService } from './environmental-sensing-service.service';
import {BleService} from './ble-service';
import {DeviceInfo} from './device-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Device Chooser!';
  services: BleService[] = [];
  serviceSelected: BleService = null;
  devices: DeviceInfo[] = [];
  constructor(private environmentalSensingService: EnvironmentalSensingService) {}

  ngOnInit() {
    this.services = this.environmentalSensingService.getServices();
  }

  addDevice() {
    if (this.serviceSelected) {
      this.environmentalSensingService.getDevice(this.serviceSelected).subscribe(gatt => {
        const device = {
          name: gatt.device.name,
          value: 0
        };
        this.environmentalSensingService.getValue(gatt, this.serviceSelected)
          .finally(() => {
              this.devices = this.devices.filter(item => item !== device);
          })
          .subscribe(value => {
            device.value = value;
          });
        this.devices.push(device);
      });
    }
  }
}
