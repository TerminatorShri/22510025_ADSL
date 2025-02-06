import { TestBed } from '@angular/core/testing';

import { StudentActionService } from './student-action.service';

describe('StudentActionService', () => {
  let service: StudentActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
