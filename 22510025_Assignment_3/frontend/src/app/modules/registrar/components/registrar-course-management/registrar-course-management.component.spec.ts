import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCourseManagementComponent } from './registrar-course-management.component';

describe('RegistrarCourseManagementComponent', () => {
  let component: RegistrarCourseManagementComponent;
  let fixture: ComponentFixture<RegistrarCourseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarCourseManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarCourseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
