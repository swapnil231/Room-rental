import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalRoutingModule } from './rental-routing.module';
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalccComponent } from './rentalcc/rentalcc.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RentalDetailsComponent,
    RentalListingComponent,
    RentalccComponent,
  ],
  imports: [
    CommonModule,
    RentalRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
  ],
  exports: [RentalDetailsComponent, RentalListingComponent, RentalccComponent],
})
export class RentalModule {}
