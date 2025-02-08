import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCompletedExamsComponent } from './student-completed-exams.component';

describe('StudentCompletedExamsComponent', () => {
  let component: StudentCompletedExamsComponent;
  let fixture: ComponentFixture<StudentCompletedExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCompletedExamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCompletedExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
