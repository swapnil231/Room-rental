import { TestBed } from '@angular/core/testing';

import { RentalistingService } from './rentalisting.service';

describe('RentalistingService', () => {
  let service: RentalistingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalistingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
