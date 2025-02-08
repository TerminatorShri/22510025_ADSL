import { TestBed } from '@angular/core/testing';

import { AuthActionService } from './auth-action.service';

describe('AuthActionService', () => {
  let service: AuthActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
