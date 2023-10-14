import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRentalsComponent } from './manage-rentals.component';

describe('ManageRentalsComponent', () => {
  let component: ManageRentalsComponent;
  let fixture: ComponentFixture<ManageRentalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageRentalsComponent]
    });
    fixture = TestBed.createComponent(ManageRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
