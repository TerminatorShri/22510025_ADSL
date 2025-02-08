import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamResultsComponent } from './student-exam-results.component';

describe('StudentExamResultsComponent', () => {
  let component: StudentExamResultsComponent;
  let fixture: ComponentFixture<StudentExamResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentExamResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentExamResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
