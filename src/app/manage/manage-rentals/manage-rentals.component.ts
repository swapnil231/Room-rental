import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/shared/rental-modal';
import { RentalistingService } from 'src/app/shared/rentalisting.service';

@Component({
  selector: 'app-manage-rentals',
  templateUrl: './manage-rentals.component.html',
  styleUrls: ['./manage-rentals.component.scss'],
})
export class ManageRentalsComponent implements OnInit {
  isFetching = false;
  rental: Rental[] = [];

  constructor(
    private rentalisting_service: RentalistingService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.rentalisting_service.getAuthUserRentals().subscribe((res) => {
      this.rental = res;
      if (res && res.length == 0) {
        this.isFetching = false;
      }
    });
  }

  Edit(arg0: string) {
    this.router.navigate([`rental/${arg0}/edit`]);
  }

  deleterental(id: any) {
    const canDelete = this.askForConformation();

    if (!canDelete) {
      return;
    }
    this.rentalisting_service.deleterentals(id).subscribe({
      next: () => {
        const index = this.rental.findIndex((r) => r._id == id);
        this.rental.splice(index, 1);
        if (this.rental.length == 0) {
          this.isFetching = false;
        }

        this.showSuccess('Rental deleted sucessfully', 'Sucess');
      },
      error: (err) => {
        const er = err.error.errors[0].detail;
        this.showSuccess(er, 'Failed');
      },
    });
  }

  private askForConformation(): boolean {
    return window.confirm('are you sure you want to delete rentals?');
  }

  showSuccess(msg: string, title: string) {
    this.toastr.success(msg, title, {
      timeOut: 3000,
      closeButton: true,
    });
  }
}
