import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RentalistingService } from 'src/app/shared/rentalisting.service';
import { bookingModel } from 'src/app/auth/shared/bookingModel/bookingModel';
import { BookingService } from '../shared/service/booking.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.scss'],
})
export class BookingConfirmComponent implements OnInit {
  constructor(
    private matdilog: MatDialog,
    private rentalservice: RentalistingService,
    private bookingservice: BookingService,
    private router: Router,
    private render2: Renderer2,
    private toastr: ToastrService
  ) {}

  @ViewChild('resetvar') resetvar!: ElementRef;
  bookingdata!: bookingModel;

  ngOnInit(): void {
    this.rentalservice.cast.subscribe((res) => {
      this.bookingdata = res;
    });
  }

  close() {
    this.matdilog.closeAll();
  }
  errors: any;

  confirmbooking() {
    console.log(this.bookingdata);
    this.bookingservice.creatbooking(this.bookingdata).subscribe({
      next: (res: any) => {
        if (res && res.message === 'booking created') {
          this.matdilog.closeAll();
          this.bookingdata.guests = 1;
          this.resetdate();
          this.showSuccess();
          this.router.navigate(['/manage/bookings']);
        }
      },
      error: (err) => {
        this.errors = err.error.errors[0].detail;
        alert(err.error.errors[0].detail);
      },
    });
  }

  resetdate() {
    const x = document.querySelector<HTMLElement>('.mybtn')?.click();
  }

  showSuccess() {
    this.toastr.success('Booking has been created!', 'Booking', {
      timeOut: 3000,
      closeButton: true,
    });
  }
}
