import { Injectable } from '@angular/core';

import 'rxjs/add/operator/mergeMap';

import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';
import { BleService } from './ble-service';

@Injectable()
export class EnvironmentalSensingService {

  constructor(public ble: BluetoothCore) { }

  getServices() :BleService[] {
    return [
      { service: 'glucose', characteristic: 'glucose_measurement', name: 'Medidor de glucosa' },
      { service: 'heart_rate', characteristic: 'heart_rate_measurement', name: 'Medidor de ritmo cardiaco' }
    ];
  }
  getDevice(service: BleService) {
    return this.ble
      .discover$({
        filters: [{ services: [service.service] }]
      });
  }
  getValue(gatt, s: BleService) {
    return this.ble.getPrimaryService$(gatt, s.service)
      .mergeMap(service => this.ble.getCharacteristic$(service, s.characteristic))
      .mergeMap(char => this.ble.observeValue$(char))
      .map(value => value.getUint16(0, true));
  }
}
