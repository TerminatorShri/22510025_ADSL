import { TestBed } from '@angular/core/testing';

import { TeacherActionService } from './teacher-action.service';

describe('TeacherActionService', () => {
  let service: TeacherActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
