import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalHomesComponent } from './rental-homes.component';

describe('RentalHomesComponent', () => {
  let component: RentalHomesComponent;
  let fixture: ComponentFixture<RentalHomesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalHomesComponent]
    });
    fixture = TestBed.createComponent(RentalHomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
