import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditableComponent } from './image-editable.component';

describe('ImageEditableComponent', () => {
  let component: ImageEditableComponent;
  let fixture: ComponentFixture<ImageEditableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageEditableComponent]
    });
    fixture = TestBed.createComponent(ImageEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
