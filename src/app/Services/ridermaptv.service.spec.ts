import { TestBed } from '@angular/core/testing';

import { RidermaptvService } from './ridermaptv.service';

describe('RidermaptvService', () => {
  let service: RidermaptvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RidermaptvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
