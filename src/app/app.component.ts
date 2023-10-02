import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/shared/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  number = 0;

  title = 'roonrental';
  private game = 8;
  value = 'ram';

  constructor(public authservice: AuthService) {}
  ngOnInit(): void {
    this.authservice.checkauthsatus();
  }

  onadd() {
    // this.number = ++this.number;
    this.number += 1;
  }
  onmin() {
    if (this.number == 0) {
      return;
    }
    // this.number = --this.number;
    this.number -= 1;
  }
  get authstatus() {
    return this.authservice.isauthenticated;
  }

  get username() {
    return this.authservice.username;
  }
  logout() {
    this.authservice.logout();
  }
}
