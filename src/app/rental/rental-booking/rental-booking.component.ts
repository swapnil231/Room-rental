import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

// import * as moment from 'moment';
import { Moment } from 'moment';
import * as moment from 'moment';
import { bookingModel } from 'src/app/auth/shared/bookingModel/bookingModel';
import { Rental } from 'src/app/shared/rental-modal';
import { BookingConfirmComponent } from '../booking-confirm/booking-confirm.component';
import { RentalistingService } from 'src/app/shared/rentalisting.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { BookingService } from '../shared/service/booking.service';

@Component({
  selector: 'app-rental-booking',
  templateUrl: './rental-booking.component.html',
  styleUrls: ['./rental-booking.component.scss'],
  providers: [],
})
export class RentalBookingComponent implements OnInit {
  @Input() isauth = false;
  @Input() rental!: Rental;
  public date!: any;

  mindate = new Date();
  maxdate = new Date(2024, 12, 31);

  newbooking!: bookingModel;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    public dialog: MatDialog,
    private rentalservice: RentalistingService,
    private render2: Renderer2,
    private bookingservice: BookingService
  ) {
    this.dateAdapter.setLocale('en-CA');
  }

  ngOnInit(): void {
    this.initbooking();
    this.getbooking();
  }

  madeBookings: any[] = [];
  getbooking() {
    this.bookingservice.getbooking(this.rental._id).subscribe({
      next: (res: bookingModel[]) => {
        res.forEach((el) => this.bookoutdates(el.startAt, el.endAt));
        console.log(res, 'ress');
        console.log(this.madeBookings, 'mybooking');
      },
      error: (err) => {
        console.log(err.error);
        console.log(err.error.errors[0].detail);
      },
    });
  }

  initbooking() {
    this.newbooking = new bookingModel();
    this.newbooking.guests = 1;
  }
  startDate!: string;
  endDate!: string;

  OnDateChange(event: any) {
    const x = event.target.value;
    this.startDate = moment(x).format('YYYY-MM-DD');
  }

  OnDateChange2(event: any) {
    const y = event.target.value;
    this.endDate = moment(y).format('YYYY-MM-DD');
    if (this.endDate === 'Invalid date') {
      return;
    }
  }

  updatebooking() {
    if (!this.startDate || !this.endDate) {
      alert('provide dates for booking');
      return;
    }

    if (
      this.momentConvertedDates.dateOne.isSame(
        this.momentConvertedDates.dateTwo
      )
    ) {
      alert('booking on same dates are not allowed');
      return;
    }
    this.newbooking.startAt = this.startDate;
    this.newbooking.endAt = this.endDate;
    this.newbooking.nights = this.calculatenight;
    this.newbooking.guests;
    this.newbooking.price = this.rental.dailyPrice * this.newbooking.nights;
    this.newbooking.rental = { ...this.rental };
    this.rentalservice.sendbookingdata(this.newbooking);
    this.openDialog('', '');
  }

  get calculatenight() {
    const nights = this.momentConvertedDates.dateTwo.diff(
      this.momentConvertedDates.dateOne,
      'days'
    );
    return nights;
  }

  get momentConvertedDates() {
    const dateOne = moment(this.startDate);
    const dateTwo = moment(this.endDate);
    return { dateOne, dateTwo };
  }

  get isbookingdatavalid() {
    const x =
      this.startDate &&
      this.endDate &&
      this.newbooking.guests &&
      this.newbooking.guests > 0;
    return x;
  }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(BookingConfirmComponent, {
      panelClass: 'custom-dialog-container',
      height: 'auto',
      width: '400px',

      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  @ViewChild('picker') datepicker!: MatDatepicker<Date | null>;

  reset() {
    if (this.datepicker) {
      this.datepicker.select(null);
    }
  }

  calcRangeDatesUsingMoment(startAt: string, endAt: string): string[] | any {
    const dates: string[] = [];

    let mStartAt = moment(startAt);
    const mEndAt = moment(endAt);

    while (mStartAt < mEndAt) {
      dates.push(mStartAt.format());
      mStartAt = mStartAt.add(1, 'day');
    }
    return dates;
  }
  bookoutdates(startAt: any, endAt: any) {
    const daterange = this.calcRangeDatesUsingMoment(startAt, endAt);
    this.madeBookings.push(...daterange);
  }

  bookingdatesRangFilter = (date: Moment): boolean => {
    if (this.madeBookings.includes(date.format())) {
      return false;
    } else {
      return true;
    }
  };
}
