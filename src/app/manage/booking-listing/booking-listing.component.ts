import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { bookingModel } from 'src/app/auth/shared/bookingModel/bookingModel';
import { BookingService } from 'src/app/rental/shared/service/booking.service';

@Component({
  selector: 'app-booking-listing',
  templateUrl: './booking-listing.component.html',
  styleUrls: ['./booking-listing.component.scss'],
})
export class BookingListingComponent implements OnInit {
  constructor(
    private bookingservice: BookingService,
    private toastr: ToastrService
  ) {}

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
      },
      error: (err) => {
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
      next: () => {
        const index = this.booking.findIndex((r) => r._id == id);
        this.booking.splice(index, 1);

        if (this.booking.length == 0) {
          this.isFetching = false;
        }
        this.showSuccess('booking deleted sucessfully', 'Sucess');
      },
      error: (err) => {
        const er = err.error.errors[0].detail;
        this.showSuccess(er, 'Failed');
      },
    });
  }

  private askForConformation(): boolean {
    return window.confirm('are you sure you want to delete rentals?');
  }

  showSuccess(msg: string, title: string) {
    this.toastr.success(msg, title, {
      timeOut: 3000,
      closeButton: true,
    });
  }
}
