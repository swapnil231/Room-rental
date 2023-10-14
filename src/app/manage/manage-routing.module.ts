import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { ManageRentalsComponent } from './manage-rentals/manage-rentals.component';
import { authguardGuard } from '../auth/guard/authguard.guard';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      {
        path: 'bookings',
        component: ManageBookingsComponent,
        canActivate: [authguardGuard],
      },
      {
        path: 'rentals',
        component: ManageRentalsComponent,
        canActivate: [authguardGuard],
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
export class ManageRoutingModule {}
