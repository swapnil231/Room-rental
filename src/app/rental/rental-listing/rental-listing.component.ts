import { Component, OnInit } from '@angular/core';
import { RentalistingService } from 'src/app/shared/rentalisting.service';
import { Rental } from 'src/app/shared/rental-modal';

@Component({
  selector: 'app-rental-listing',
  templateUrl: './rental-listing.component.html',
  styleUrls: ['./rental-listing.component.scss'],
})
export class RentalListingComponent implements OnInit {
  rental: Rental[] = [];

  ngOnInit(): void {
    this.rentalisting_service.getRentals().subscribe((res) => {
      this.rental = res;
    });
  }

  sendparent: any;
  msg = '';

  constructor(private rentalisting_service: RentalistingService) {}

  xxx(nym: number) {
    this.msg = 'msg recived';
    return (this.sendparent = nym);
  }
}
