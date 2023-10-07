import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalistingService } from 'src/app/shared/rentalisting.service';
import { Rental } from 'src/app/shared/rental-modal';
import { Form } from '@angular/forms';
import { UppercasefirstLetterPipe } from 'src/app/shared/uppercasefirst-letter.pipe';
import { HighlightDirective } from 'src/app/shared/highlight.directive';
import { AuthService } from 'src/app/auth/shared/service/auth.service';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.scss'],
})
export class RentalDetailsComponent implements OnInit {
  param = '';
  msg: any;
  bgColor = 'pink';
  rental!: Rental;
  value = 'ram';
  auth: any;

  constructor(
    private activated_route: ActivatedRoute,
    private rental_service: RentalistingService,
    private authservuce: AuthService
  ) {}

  ngOnInit(): void {
    this.activated_route.params.subscribe((params) => {
      this.param = params['rentalid'];
      this.rental_service.getrentaldetails(this.param).subscribe((res) => {
        this.rental = res;
        console.log(this.rental);
      });
    });
    this.auth = this.authservuce.isauthenticated;
  }
}
