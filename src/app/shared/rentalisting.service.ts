import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental-modal';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RentalistingService {
  constructor(private http: HttpClient) {}

  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`http://localhost:4200/api/v1/rentals`);
  }

  getrentaldetails(rentalId: any): Observable<Rental> {
    return this.http.get<Rental>(
      `http://localhost:4200/api/v1/rentals/${rentalId}`
    );
    // return this.rentals.filter((value)=>(value._id===id))
  }
}
