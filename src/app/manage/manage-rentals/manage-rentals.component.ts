import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rental } from 'src/app/shared/rental-modal';
import { RentalistingService } from 'src/app/shared/rentalisting.service';

@Component({
  selector: 'app-manage-rentals',
  templateUrl: './manage-rentals.component.html',
  styleUrls: ['./manage-rentals.component.scss'],
})
export class ManageRentalsComponent implements OnInit {
  Edit(arg0: string) {
    this.router.navigate([`rental/${arg0}/edit`]);
  }
  isFetching = false;

  deleterental(id: any) {
    const canDelete = this.askForConformation();

    if (!canDelete) {
      return;
    }
    this.rentalisting_service.deleterentals(id).subscribe({
      next: (res: any) => {
        //  to render changes in ui
        const index = this.rental.findIndex((r) => r._id == id);
        this.rental.splice(index, 1);
        if (this.rental.length == 0) {
          this.isFetching = false;
        }

        alert('rental delete');
      },
      error: (err) => {
        console.log(err);
        alert(err.error.errors[0].detail);
      },
    });
  }
  rental: Rental[] = [];

  ngOnInit(): void {
    this.isFetching = true;
    this.rentalisting_service.getAuthUserRentals().subscribe((res) => {
      this.rental = res;
      if (res && res.length == 0) {
        this.isFetching = false;
      }
      console.log(res);
    });
  }
  constructor(
    private rentalisting_service: RentalistingService,
    private router: Router
  ) {}

  private askForConformation(): boolean {
    return window.confirm('are you sure you want to delete rentals?');
  }
}
