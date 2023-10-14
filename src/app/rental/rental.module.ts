import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalRoutingModule } from './rental-routing.module';
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalccComponent } from './rentalcc/rentalcc.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SupersecretComponent } from './supersecret/supersecret.component';
import { RentalNewComponent } from './rental-new/rental-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RentalBookingComponent } from './rental-booking/rental-booking.component';

import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { RentalHomesComponent } from './rental-homes/rental-homes.component';
import { RentalEditComponent } from './rental-edit/rental-edit.component';

@NgModule({
  declarations: [
    RentalDetailsComponent,
    RentalListingComponent,
    RentalccComponent,
    SupersecretComponent,
    RentalNewComponent,
    RentalBookingComponent,
    RentalHomesComponent,
    RentalEditComponent,
  ],

  imports: [
    CommonModule,
    RentalRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatMomentDateModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports: [RentalDetailsComponent, RentalListingComponent, RentalccComponent],
})
export class RentalModule {}
