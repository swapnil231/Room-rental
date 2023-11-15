import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  city = '';
  isFetching = false;
  rentals: Rental[] = [];

  ngOnInit(): void {
    this.getActivatedRoutes();
  }

  getActivatedRoutes() {
    this.activatedroute.params.subscribe((param) => {
      this.city = param['city'];
      this.getRentalsByCityNames(this.city);
    });
  }

  getRentalsByCityNames(city: string) {
    this.isFetching = true;
    this.rentalservice.getRentalsbycity(city).subscribe({
      next: (res) => {
        this.rentals = res;
        this.isFetching = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
