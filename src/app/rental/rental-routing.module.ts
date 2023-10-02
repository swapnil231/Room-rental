import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { RentalccComponent } from './rentalcc/rentalcc.component';
import { SupersecretComponent } from './supersecret/supersecret.component';
import { authguardGuard } from '../auth/guard/authguard.guard';

const routes: Routes = [
  {
    path: 'rental',
    component: RentalccComponent,
    children: [
      { path: '', component: RentalListingComponent },
      {
        path: 'super',
        component: SupersecretComponent,
        canActivate: [authguardGuard],
      },
      {
        path: ':rentalid',
        component: RentalDetailsComponent,
      },

      {
        path: '**',
        component: RentalListingComponent,
        pathMatch: 'full',
      },

      // {
      //   path: '**',
      //   component: RentalListingComponent,
      //   pathMatch: 'full',
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalRoutingModule {}
