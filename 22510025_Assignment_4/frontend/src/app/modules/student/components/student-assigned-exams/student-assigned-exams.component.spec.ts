import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignedExamsComponent } from './student-assigned-exams.component';

describe('StudentAssignedExamsComponent', () => {
  let component: StudentAssignedExamsComponent;
  let fixture: ComponentFixture<StudentAssignedExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentAssignedExamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAssignedExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
