import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { RentalccComponent } from './rentalcc/rentalcc.component';
import { SupersecretComponent } from './supersecret/supersecret.component';
import { authguardGuard } from '../auth/guard/authguard.guard';
import { RentalNewComponent } from './rental-new/rental-new.component';
import { RentalHomesComponent } from './rental-homes/rental-homes.component';
import { RentalEditComponent } from './rental-edit/rental-edit.component';
import { rentalGuard } from '../auth/shared/rental-guard/rental.guard';

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
        path: 'new',
        component: RentalNewComponent,
        canActivate: [authguardGuard],
      },
      {
        path: ':rentalid/id',
        component: RentalDetailsComponent,
      },
      {
        path: ':rentalId/edit',
        component: RentalEditComponent,
        canActivate: [authguardGuard, rentalGuard],
      },

      {
        path: ':city/homes',
        component: RentalHomesComponent,
      },

      {
        path: '**',
        component: RentalListingComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentalRoutingModule {}
