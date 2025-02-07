import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarStudentManagementComponent } from './registrar-student-management.component';

describe('RegistrarStudentManagementComponent', () => {
  let component: RegistrarStudentManagementComponent;
  let fixture: ComponentFixture<RegistrarStudentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarStudentManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarStudentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
