import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { GuestguardGuard, authguardGuard } from './auth/guard/authguard.guard';
import { RentalListingComponent } from './rental/rental-listing/rental-listing.component';
import { SupersecretComponent } from './rental/supersecret/supersecret.component';

const routes: Routes = [
  { path: '', redirectTo: '/rental', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [GuestguardGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestguardGuard],
  },

  // {
  //   path: 'rental/super',
  //   component: SupersecretComponent,
  //   canActivate: [authguardGuard],
  //   pathMatch: 'full',
  // },
  // {
  //   path: '**',
  //   component: RentalListingComponent,

  //   pathMatch: 'full',
  // },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
