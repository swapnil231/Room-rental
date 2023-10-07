import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Rental } from 'src/app/shared/rental-modal';

import { RentalistingService } from 'src/app/shared/rentalisting.service';

@Component({
  selector: 'app-rental-new',
  templateUrl: './rental-new.component.html',
  styleUrls: ['./rental-new.component.scss'],
})
export class RentalNewComponent implements OnInit, OnDestroy {
  rentalCategories = ['apartment', 'condo', 'house'];

  creatrental!: FormGroup;
  errorx: any;

  sucessMessage: any;
  timeout: any;

  constructor(
    private fb: FormBuilder,
    private rentalservice: RentalistingService,
    private router_: Router
  ) {}
  ngOnDestroy(): void {
    this.timeout && clearTimeout(this.timeout);
  }

  ngOnInit(): void {
    this.forminit();
  }

  forminit() {
    this.creatrental = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      city: ['', [Validators.required, Validators.maxLength(10)]],
      street: ['', [Validators.required, Validators.maxLength(20)]],
      category: ['apartment'],
      image: ['', [Validators.required]],

      numOfRooms: ['', [Validators.required, Validators.maxLength(50)]],
      dailyPrice: ['', [Validators.required]],
      description: ['', [Validators.required], Validators.maxLength(50)],

      shared: [''],
    });
  }
  get title(): AbstractControl | null {
    return this.creatrental.get('title');
  }
  get city(): AbstractControl | null {
    return this.creatrental.get('city');
  }
  get street(): AbstractControl | null {
    return this.creatrental.get('street');
  }
  get category(): AbstractControl | null {
    return this.creatrental.get('category');
  }
  get image(): AbstractControl | null {
    return this.creatrental.get('image');
  }
  get numOfRooms(): AbstractControl | null {
    return this.creatrental.get('numOfRooms');
  }
  get description(): AbstractControl | null {
    return this.creatrental.get('description');
  }
  get dailyPrice(): AbstractControl | null {
    return this.creatrental.get('dailyPrice');
  }
  get phone(): AbstractControl | null {
    return this.creatrental.get('phone');
  }
  get shared(): AbstractControl | null {
    return this.creatrental.get('shared');
  }

  submit() {
    if (this.creatrental.invalid) {
      alert('FORM IS invalid');
      return;
    }

    this.rentalservice.creatrentals(this.creatrental.value).subscribe({
      next: (res) => {
        if (Object.keys(res).length !== 0) {
          console.log(res);
          this.sucessMessage = 'rental creted sucessfully';
          this.timeout = setTimeout(() => {
            this.router_.navigate(['/rental']);
          }, 700);
        }
        console.log(res);
      },
      error: (err) => {
        console.log(err, 'hiiii');
        this.errorx = err.error.errors[0].detail;

        alert(JSON.stringify(err));
      },
    });
  }
}
