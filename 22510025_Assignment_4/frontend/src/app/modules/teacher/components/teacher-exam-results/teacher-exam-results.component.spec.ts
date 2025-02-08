import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExamResultsComponent } from './teacher-exam-results.component';

describe('TeacherExamResultsComponent', () => {
  let component: TeacherExamResultsComponent;
  let fixture: ComponentFixture<TeacherExamResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherExamResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherExamResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
