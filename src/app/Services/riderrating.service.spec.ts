import { TestBed } from '@angular/core/testing';

import { RiderratingService } from './riderrating.service';

describe('RiderratingService', () => {
  let service: RiderratingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiderratingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
