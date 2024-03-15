import { TestBed } from '@angular/core/testing';

import { HighchartStoremeterService } from './highchart-storemeter.service';

describe('HighchartStoremeterService', () => {
  let service: HighchartStoremeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighchartStoremeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
