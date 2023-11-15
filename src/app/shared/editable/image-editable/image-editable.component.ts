import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Rental } from '../../rental-modal';
import { RentalistingService } from '../../rentalisting.service';
import { ImageSnippet } from '../../image-uplod/image/image.component';

@Component({
  selector: 'app-image-editable',
  templateUrl: './image-editable.component.html',
  styleUrls: ['./image-editable.component.scss'],
})
export class ImageEditableComponent {
  istrue = true;
  @Input() rental!: Rental;
  imageidx: any;
  selectedimage!: ImageSnippet;

  constructor(private rental_service: RentalistingService) {}

  selectedImag($event: any) {
    this.selectedimage = $event;
    this.istrue = false;
  }

  attachImageToRental(imageId: string) {
    this.imageidx = imageId;
    this.rental.image._id = this.imageidx;

    if (this.imageidx) {
      this.updateRental();
    }
  }

  updateRental() {
    this.rental_service.updaterentals(this.rental._id, this.rental).subscribe({
      next: (res: any) => {
        this.rental = res;
        alert('image save sucessfully');
      },
      error: (err) => {
        alert(err.error.errors[0].detail);
      },
    });
  }

  attachMethod($event: any) {
    this.istrue = $event;
  }
}
