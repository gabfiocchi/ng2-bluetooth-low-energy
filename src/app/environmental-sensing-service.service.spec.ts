import { TestBed, inject } from '@angular/core/testing';

import { EnvironmentalSensingServiceService } from './environmental-sensing-service.service';

describe('EnvironmentalSensingServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentalSensingServiceService]
    });
  });

  it('should ...', inject([EnvironmentalSensingServiceService], (service: EnvironmentalSensingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
