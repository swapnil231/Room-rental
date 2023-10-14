import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Rental } from 'src/app/shared/rental-modal';
import { RentalistingService } from 'src/app/shared/rentalisting.service';

@Component({
  selector: 'app-rental-homes',
  templateUrl: './rental-homes.component.html',
  styleUrls: ['./rental-homes.component.scss'],
})
export class RentalHomesComponent implements OnInit {
  constructor(
    private activatedroute: ActivatedRoute,
    private rentalservice: RentalistingService
  ) {}
  city: string = '';

  ngOnInit(): void {
    this.getActivatedRoutes();
  }

  getActivatedRoutes() {
    this.activatedroute.params.subscribe((param) => {
      this.city = param['city'];
      this.getRentalsByCityNames(this.city);
    });
  }
  isFetching = false;
  rentals: Rental[] = [];
  getRentalsByCityNames(city: string) {
    this.isFetching = true;
    console.log(city);
    this.rentalservice.getRentalsbycity(city).subscribe({
      next: (res) => {
        this.rentals = res;
        this.isFetching = false;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
