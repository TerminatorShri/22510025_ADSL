import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperDashboardComponent } from './paper-dashboard.component';

describe('PaperDashboardComponent', () => {
  let component: PaperDashboardComponent;
  let fixture: ComponentFixture<PaperDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
