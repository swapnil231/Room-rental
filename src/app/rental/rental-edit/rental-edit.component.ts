import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/service/auth.service';
import { Rental } from 'src/app/shared/rental-modal';
import { RentalistingService } from 'src/app/shared/rentalisting.service';

@Component({
  selector: 'app-rental-edit',
  templateUrl: './rental-edit.component.html',
  styleUrls: ['./rental-edit.component.scss'],
})
export class RentalEditComponent implements OnInit {
  param = '';
  msg: any;
  bgColor = 'pink';
  rental!: Rental;
  value = 'ram';
  auth: any;
  rentalcategories = Rental.CATEGORIES;
  $locationSubject = new Subject<string>();
  istrue = false;

  constructor(
    private activated_route: ActivatedRoute,
    private rental_service: RentalistingService,
    private authservuce: AuthService
  ) {}

  ngOnInit(): void {
    this.getactivatedrouteId();
  }

  getactivatedrouteId() {
    this.activated_route.params.subscribe((params) => {
      this.param = params['rentalId'];
      this.rental_service.getrentaldetails(this.param).subscribe((res) => {
        this.rental = res;
      });
    });
    this.auth = this.authservuce.isauthenticated;
  }

  updateRental(event: any) {
    const { data, notifier } = event;
    if (data.city || data.street) {
      this.$locationSubject.next(`${this.rental.city},${this.rental.street}`);
    }

    this.rental_service.updaterentals(this.rental._id, data).subscribe({
      next: (res: any) => {
        this.rental = res;
        notifier(null);
      },
      error: (err) => {
        notifier(err);
        alert(err.error.errors[0].detail);
      },
    });
  }

  convertStringtoNumber(assets: any) {
    const { numOfRooms } = this.rental;
    return parseInt(<any>numOfRooms, 10) + assets;
  }

  methodistrue($event: any) {
    this.istrue = $event;
  }
}
