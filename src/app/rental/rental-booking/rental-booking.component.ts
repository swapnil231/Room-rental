import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { DateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
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
    // this.checkifdatesareValid;
    this.filter2;
  }

  madeBookings: any[] = [];
  getbooking() {
    this.bookingservice.getbooking(this.rental._id).subscribe({
      next: (res: bookingModel[]) => {
        res.forEach((el) => {
          const daterange = this.calcRangeDatesUsingMoment(
            el.startAt,
            el.endAt
          );
          this.madeBookings.push(...daterange);
        });
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
    // console.log(event.target.value);
    this.startDate = moment(x).format('YYYY-MM-DD');
    // console.log(myDate);
    console.log(this.startDate);
  }
  OnDateChange2(event: any) {
    // console.log(event.target.value);

    const y = event.target.value;
    // console.log(event.target.value);
    this.endDate = moment(y).format('YYYY-MM-DD');
    if (this.endDate === 'Invalid date') {
      return;
    }
    console.log(this.endDate);
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

    console.log(this.newbooking.startAt, 'kkkk');
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
    let dateOne = moment(this.startDate);
    let dateTwo = moment(this.endDate);
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
      width: '360px',
      height: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    // this.resetdate();
  }

  @ViewChild('picker') datepicker!: MatDatepicker<Date | null>;

  reset() {
    if (this.datepicker) {
      this.datepicker.select(null);
    }
  }
  // @ViewChild('resetvar') resetvar!: ElementRef;
  // resetdate() {
  //   this.rentalservice.sendDate(this.resetvar);
  //   console.log(this.resetvar.nativeElement);
  // }

  calcRangeDatesUsingMoment(startAt: string, endAt: string): string[] | any {
    let dates: string[] = [];
    // if (moment(startAt)) {
    // console.log(startAt);
    // dates.push(moment(startAt).format());
    let mStartAt = moment(startAt);
    const mEndAt = moment(endAt);

    while (mStartAt < mEndAt) {
      dates.push(mStartAt.format());
      mStartAt = mStartAt.add(1, 'day');
      // }
    }
    return dates;
    // let mStartAt = moment(startAt);
    // const mEndAt = moment(endAt);
    // while (mStartAt > mEndAt) {
    //   dates.push(mStartAt.format());
    //   mStartAt = mStartAt.add(1, 'day');
    // }
    // console.log(mStartAt);
    // console.log(dates);
    // return dates;
  }

  filter2 = (date: Moment): boolean => {
    const x = this.madeBookings.includes(date.format());
    console.log(x);
    return x;
  };
  // filter2 = (d: Date | null): boolean => {
  //   // console.log(d.format());
  //   let day = (d || new Date()).getDate()

  //   const c= this.madeBookings.includes(day);

  // };

  myDateFilter = (m: Moment | null): boolean => {
    const day = (m || moment()).day();
    return day !== 0 && day !== 6;
  };

  // sat/sun filter
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    console.log('hi');
    return day !== 0 && day !== 6;
  };
}
