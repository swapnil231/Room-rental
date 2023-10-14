import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalistingService } from 'src/app/shared/rentalisting.service';
import { Rental } from 'src/app/shared/rental-modal';
import { Form } from '@angular/forms';
import { UppercasefirstLetterPipe } from 'src/app/shared/uppercasefirst-letter.pipe';
import { HighlightDirective } from 'src/app/shared/highlight.directive';

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
  ngOnInit(): void {
    this.activated_route.params.subscribe((params) => {
      this.param = params['rentalid'];
      this.rental_service.getrentaldetails(this.param).subscribe((res) => {
        this.rental = res;
        console.log(this.rental);
      });
    });
  }

  constructor(
    private activated_route: ActivatedRoute,
    private rental_service: RentalistingService
  ) {}
}
