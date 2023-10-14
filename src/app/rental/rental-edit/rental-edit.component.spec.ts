import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalEditComponent } from './rental-edit.component';

describe('RentalEditComponent', () => {
  let component: RentalEditComponent;
  let fixture: ComponentFixture<RentalEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalEditComponent]
    });
    fixture = TestBed.createComponent(RentalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
