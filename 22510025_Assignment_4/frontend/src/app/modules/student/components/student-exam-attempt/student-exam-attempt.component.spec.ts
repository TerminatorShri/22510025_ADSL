import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamAttemptComponent } from './student-exam-attempt.component';

describe('StudentExamAttemptComponent', () => {
  let component: StudentExamAttemptComponent;
  let fixture: ComponentFixture<StudentExamAttemptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentExamAttemptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentExamAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
