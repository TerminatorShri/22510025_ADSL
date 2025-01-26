import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseCrudComponent } from './database-crud.component';

describe('DatabaseCrudComponent', () => {
  let component: DatabaseCrudComponent;
  let fixture: ComponentFixture<DatabaseCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatabaseCrudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatabaseCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
