import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Auth2RoutingModule } from './auth2-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    Auth2RoutingModule
  ]
})
export class Auth2Module { }
