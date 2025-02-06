import { TestBed } from '@angular/core/testing';

import { HodActionService } from './hod-action.service';

describe('HodActionService', () => {
  let service: HodActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HodActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
