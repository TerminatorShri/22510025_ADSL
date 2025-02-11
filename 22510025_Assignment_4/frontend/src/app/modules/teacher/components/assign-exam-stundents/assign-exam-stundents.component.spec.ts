import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignExamStundentsComponent } from './assign-exam-stundents.component';

describe('AssignExamStundentsComponent', () => {
  let component: AssignExamStundentsComponent;
  let fixture: ComponentFixture<AssignExamStundentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignExamStundentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignExamStundentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
