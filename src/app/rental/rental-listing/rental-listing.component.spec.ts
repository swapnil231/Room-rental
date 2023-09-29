import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalListingComponent } from './rental-listing.component';

describe('RentalListingComponent', () => {
  let component: RentalListingComponent;
  let fixture: ComponentFixture<RentalListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalListingComponent]
    });
    fixture = TestBed.createComponent(RentalListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
