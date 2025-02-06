import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarManagementComponent } from './registrar-management.component';

describe('RegistrarManagementComponent', () => {
  let component: RegistrarManagementComponent;
  let fixture: ComponentFixture<RegistrarManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
