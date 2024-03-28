import { TestBed } from '@angular/core/testing';

import { RidersettengService } from './ridersetteng.service';

describe('RidersettengService', () => {
  let service: RidersettengService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidersettengService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
