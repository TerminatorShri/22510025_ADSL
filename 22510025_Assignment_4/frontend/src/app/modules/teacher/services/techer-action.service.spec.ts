import { TestBed } from '@angular/core/testing';

import { TecherActionService } from './techer-action.service';

describe('TecherActionService', () => {
  let service: TecherActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecherActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
