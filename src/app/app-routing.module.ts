import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GuestguardGuard } from './auth/guard/authguard.guard';
import { RentalListingComponent } from './rental/rental-listing/rental-listing.component';
import { ManageComponent } from './manage/manage/manage.component';

const routes: Routes = [
  // { path: '', redirectTo: '/rental', pathMatch: 'full' },
  { path: '', component: RentalListingComponent },

  { path: 'login', component: LoginComponent, canActivate: [GuestguardGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestguardGuard],
  },

  {
    path: 'login/:id',
    component: RentalListingComponent,

    pathMatch: 'full',
  },
  {
    path: 'register/:id',
    component: RentalListingComponent,

    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
