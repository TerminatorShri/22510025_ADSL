import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExamQuestionsComponent } from './teacher-exam-questions.component';

describe('TeacherExamQuestionsComponent', () => {
  let component: TeacherExamQuestionsComponent;
  let fixture: ComponentFixture<TeacherExamQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherExamQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherExamQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
