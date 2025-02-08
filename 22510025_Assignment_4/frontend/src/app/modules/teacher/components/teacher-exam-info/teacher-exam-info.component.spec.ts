import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExamInfoComponent } from './teacher-exam-info.component';

describe('TeacherExamInfoComponent', () => {
  let component: TeacherExamInfoComponent;
  let fixture: ComponentFixture<TeacherExamInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherExamInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherExamInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
