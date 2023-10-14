import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalccComponent } from './rentalcc.component';

describe('RentalccComponent', () => {
  let component: RentalccComponent;
  let fixture: ComponentFixture<RentalccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalccComponent]
    });
    fixture = TestBed.createComponent(RentalccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
