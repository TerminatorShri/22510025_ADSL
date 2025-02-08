import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherExamDashboardLayoutComponent } from './teacher-exam-dashboard-layout.component';

describe('TeacherExamDashboardLayoutComponent', () => {
  let component: TeacherExamDashboardLayoutComponent;
  let fixture: ComponentFixture<TeacherExamDashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherExamDashboardLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherExamDashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
