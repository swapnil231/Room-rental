import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { bookingModel } from 'src/app/auth/shared/bookingModel/bookingModel';
import { BookingService } from 'src/app/rental/shared/service/booking.service';

@Component({
  selector: 'app-booking-listing',
  templateUrl: './booking-listing.component.html',
  styleUrls: ['./booking-listing.component.scss'],
})
export class BookingListingComponent implements OnInit {
  constructor(private bookingservice: BookingService) {}

  ngOnInit(): void {
    this.getbookingss();
  }
  booking!: bookingModel[];
  @Input() title = '';
  @Input() getbookings!: () => Observable<bookingModel[]>;
  @Input() type = '';

  getbookingss() {
    this.getbookings().subscribe({
      next: (res) => {
        this.booking = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.errors[0].detail);
      },
    });
  }

  isFetching = false;
  deleteRecivedBooking(id: any) {
    const canDelete = this.askForConformation();

    if (!canDelete) {
      return;
    }
    this.bookingservice.deleteRecivebooking(id).subscribe({
      next: (res: bookingModel[]) => {
        const index = this.booking.findIndex((r) => r._id == id);
        this.booking.splice(index, 1);
        // this.booking = res;
        // console.log(res);
        if (this.booking.length == 0) {
          this.isFetching = false;
        }

        alert('booking delete');
      },
      error: (err) => {
        console.log(err);
        alert(err.error.errors[0].detail);
      },
    });
  }

  private askForConformation(): boolean {
    return window.confirm('are you sure you want to delete rentals?');
  }
}
