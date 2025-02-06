import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRecordsComponent } from './teacher-records.component';

describe('TeacherRecordsComponent', () => {
  let component: TeacherRecordsComponent;
  let fixture: ComponentFixture<TeacherRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
