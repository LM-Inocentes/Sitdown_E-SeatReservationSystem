import { TestBed } from '@angular/core/testing';

import { SeatsInfoService } from './seats-info.service';

describe('SeatsInfoService', () => {
  let service: SeatsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
