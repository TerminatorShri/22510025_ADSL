import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarLayoutComponent } from './registrar-layout.component';

describe('RegistrarLayoutComponent', () => {
  let component: RegistrarLayoutComponent;
  let fixture: ComponentFixture<RegistrarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
