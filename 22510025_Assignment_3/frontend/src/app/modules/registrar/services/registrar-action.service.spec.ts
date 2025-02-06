import { TestBed } from '@angular/core/testing';

import { RegistrarActionService } from './registrar-action.service';

describe('RegistrarActionService', () => {
  let service: RegistrarActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
