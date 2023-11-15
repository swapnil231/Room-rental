import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth/shared/service/auth.service';
import { RentalistingService } from './shared/rentalisting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  placevalue: any;
  number = 0;
  title = 'roonrental';
  private game = 8;
  value = 'ram';

  constructor(
    public authservice: AuthService,
    private rentalservice: RentalistingService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.authservice.checkauthsatus();
    this.placevalue = 'serch by city name';
  }

  ngAfterViewInit(): void {
    this.closeBurgerMenuOnLinkClick();
  }

  serchcity(city: any) {
    city
      ? this.router.navigate([`/rental/${city}/homes`])
      : this.router.navigate(['/rental']);
  }

  onadd() {
    this.number += 1;
  }
  onmin() {
    if (this.number == 0) {
      return;
    }
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

  @HostListener('window:scroll', [])
  onWindowScroll(event: Event) {
    if (
      document.body.scrollTop > 45 ||
      document.documentElement.scrollTop > 45
    ) {
      document.querySelector('.nav-bar')?.classList.add('sticky-top');
    } else {
      document.querySelector('.nav-bar')?.classList.remove('sticky-top');
    }
  }

  /////closeBurgerMenuOnLinkClick////////////////////////////////////

  closeBurgerMenuOnLinkClick() {
    const allnavLinks = document.querySelectorAll('.mylink');
    const navBarCollapse = document.querySelector('.navbar-collapse.collapse');
    allnavLinks.forEach((e) =>
      e.addEventListener('click', (onclick) =>
        navBarCollapse?.classList.remove('show')
      )
    );
  }
}
