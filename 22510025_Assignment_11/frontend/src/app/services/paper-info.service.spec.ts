import { TestBed } from '@angular/core/testing';

import { PaperInfoService } from './paper-info.service';

describe('PaperInfoService', () => {
  let service: PaperInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaperInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
