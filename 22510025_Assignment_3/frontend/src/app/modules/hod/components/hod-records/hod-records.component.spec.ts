import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodRecordsComponent } from './hod-records.component';

describe('HodRecordsComponent', () => {
  let component: HodRecordsComponent;
  let fixture: ComponentFixture<HodRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HodRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
