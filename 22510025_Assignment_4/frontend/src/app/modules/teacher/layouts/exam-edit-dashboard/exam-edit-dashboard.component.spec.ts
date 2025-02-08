import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamEditDashboardComponent } from './exam-edit-dashboard.component';

describe('ExamEditDashboardComponent', () => {
  let component: ExamEditDashboardComponent;
  let fixture: ComponentFixture<ExamEditDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamEditDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamEditDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
