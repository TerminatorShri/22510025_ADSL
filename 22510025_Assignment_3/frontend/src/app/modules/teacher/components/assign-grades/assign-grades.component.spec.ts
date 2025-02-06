import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGradesComponent } from './assign-grades.component';

describe('AssignGradesComponent', () => {
  let component: AssignGradesComponent;
  let fixture: ComponentFixture<AssignGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignGradesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
