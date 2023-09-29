import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { RentalccComponent } from './rentalcc/rentalcc.component';

const routes: Routes = [
  {
    path: 'rental',
    component: RentalccComponent,
    children: [
      { path: '', component: RentalListingComponent },
      { path: ':rentalid', component: RentalDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalRoutingModule {}
