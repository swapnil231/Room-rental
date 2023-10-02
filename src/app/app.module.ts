import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RentalModule } from './rental/rental.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Auth2Module } from './auth2/auth2.module';
import { AuthModule } from './auth/auth.module';
// import {} from './shared/routerquarypara,/index.d.ts/index';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RentalModule,
    SharedModule,
    FormsModule,
    Auth2Module,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
