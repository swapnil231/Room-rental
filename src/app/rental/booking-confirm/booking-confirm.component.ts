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
  // resetvarx!: ElementRef;
  bookingdata!: bookingModel;

  ngOnInit(): void {
    this.rentalservice.cast.subscribe((res) => {
      this.bookingdata = res;
    });
    // this.errors = null;
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
          // alert(res.message);
          // console.log(res);

          this.matdilog.closeAll();
          this.bookingdata.guests = 1;
          this.resetdate();
          this.showSuccess();
        }
      },
      error: (err) => {
        console.log(err);
        this.errors = err.error.errors[0].detail;
        console.log(this.errors);

        alert(err.error.errors[0].detail);
      },
    });
  }

  resetdate() {
    let x = document.querySelector<HTMLElement>('.mybtn')?.click();
  }

  showSuccess() {
    this.toastr.success('Booking has been created!', 'Booking', {
      timeOut: 3000,
      closeButton: true,
    });
  }
}

// how click on dom element

//    approch1
// // @ViewChild('resetvar') resetvar!: ElementRef;
// // let event = new MouseEvent('click', { bubbles: true });
//     //his.resetvarx.nativeElement.dispatchEvent(event);

// approch render2
// / this.render2.listen(this.resetvar.nativeElement, 'click', (event) => {
//   //   console.log('clicked');
//   // });

// approch3
// let x = document.querySelector<HTMLElement>('.mybtn')?.click();
