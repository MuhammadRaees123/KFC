import { TestBed } from '@angular/core/testing';

import { GraphdetailsService } from './graphdetails.service';

describe('GraphdetailsService', () => {
  let service: GraphdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
