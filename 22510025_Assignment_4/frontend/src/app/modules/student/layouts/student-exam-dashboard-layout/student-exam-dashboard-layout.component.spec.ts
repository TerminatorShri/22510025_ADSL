import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamDashboardLayoutComponent } from './student-exam-dashboard-layout.component';

describe('StudentExamDashboardLayoutComponent', () => {
  let component: StudentExamDashboardLayoutComponent;
  let fixture: ComponentFixture<StudentExamDashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentExamDashboardLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentExamDashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
