import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupersecretComponent } from './supersecret.component';

describe('SupersecretComponent', () => {
  let component: SupersecretComponent;
  let fixture: ComponentFixture<SupersecretComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupersecretComponent]
    });
    fixture = TestBed.createComponent(SupersecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
