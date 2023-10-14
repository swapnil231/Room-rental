import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { bookingModel } from 'src/app/auth/shared/bookingModel/bookingModel';
import { BookingService } from 'src/app/rental/shared/service/booking.service';

enum BOOKING_TYPES {
  received = 'received',
  all = 'all',
}

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss'],
})
export class ManageBookingsComponent implements OnInit {
  constructor(
    private activatedroute: ActivatedRoute,
    private bookingservice: BookingService
  ) {}

  ngOnInit(): void {
    this.getActivatedRoutesQueryparam();
  }

  bookingType!: string;
  bookingTypes = BOOKING_TYPES;

  getActivatedRoutesQueryparam() {
    this.activatedroute.queryParams.subscribe((param) => {
      this.bookingType = param['type'] || this.bookingTypes.all;
    });
  }

  getAuthuserBookings = () => {
    return this.bookingservice.getAuthbooking();
  };

  getRecivedBookings = () => {
    return this.bookingservice.getRecivebooking();
  };
}
