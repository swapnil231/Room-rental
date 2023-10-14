import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageRentalsComponent } from './manage-rentals/manage-rentals.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { ManageComponent } from './manage/manage.component';
import { BookingListingComponent } from './booking-listing/booking-listing.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ManageRentalsComponent,
    ManageBookingsComponent,
    ManageComponent,
    BookingListingComponent,
  ],
  imports: [CommonModule, ManageRoutingModule, SharedModule],
})
export class ManageModule {}
