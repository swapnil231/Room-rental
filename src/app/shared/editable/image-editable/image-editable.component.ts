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

  selectedImag($event: any) {
    this.selectedimage = $event;
    this.istrue = false;
  }

  @Input() rental!: Rental;
  imageidx: any;
  selectedimage!: ImageSnippet;
  // @Output() istruesend = new EventEmitter();

  constructor(private rental_service: RentalistingService) {}

  attachImageToRental(imageId: string) {
    console.log(imageId);
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
        console.log(res, 'res2');
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
