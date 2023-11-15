import { Component, OnInit } from '@angular/core';
import { RentalistingService } from 'src/app/shared/rentalisting.service';
import { Rental } from 'src/app/shared/rental-modal';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-rental-listing',
  templateUrl: './rental-listing.component.html',
  styleUrls: ['./rental-listing.component.scss'],
})
export class RentalListingComponent implements OnInit {
  sendparent: any;
  msg = '';

  constructor(private rentalisting_service: RentalistingService) {}
  rental: Rental[] = [];

  ngOnInit(): void {
    this.rentalisting_service.getRentals().subscribe((res) => {
      this.rental = res;
    });
  }

  xxx(nym: number) {
    this.msg = 'msg recived';
    return (this.sendparent = nym);
  }

  ////////////////////////////////////////////////

  customOptions: OwlOptions = {
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 0 /*(ms you want)*/,
    smartSpeed: 1500,
    navText: ['', ''],
    nav: true,
  };

  customOptions2: OwlOptions = {
    autoplay: true,
    smartSpeed: 1000,
    margin: 24,
    dots: false,
    loop: true,

    navText: [
      '<i class="lni lni-chevron-right"></i>',
      '<i class="lni lni-chevron-left"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    nav: true,
  };
}
