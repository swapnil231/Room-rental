import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental-modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/shared/service/auth.service';
import { bookingModel } from '../auth/shared/bookingModel/bookingModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentalistingService {
  constructor(private http: HttpClient, private authservice: AuthService) {}

  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`api/v1/rentals`);
  }

  getRentalsbycity(city: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(`api/v1/rentals?city=${city}`);
  }

  getrentaldetails(rentalId: any): Observable<Rental> {
    return this.http.get<Rental>(`api/v1/rentals/${rentalId}`);
  }

  creatrentals(newrental: Rental): Observable<Rental> {
    return this.http.post<Rental>(`api/v1/rentals`, newrental);
  }

  private bookingdata = new BehaviorSubject<any>(0);
  cast = this.bookingdata.asObservable();

  sendbookingdata(setvalue: any) {
    this.bookingdata.next(setvalue);
  }

  getAuthUserRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`api/v1/rentals/me`);
  }

  getverifiedUser(id: any): Observable<any> {
    return this.http.get<any>(`api/v1/rentals/${id}/verify-user`);
  }

  deleterentals(id: any) {
    return this.http.delete<Rental[]>(`api/v1/rentals/${id} `);
  }
  updaterentals(id: any, rental: Rental) {
    return this.http.patch<Rental[]>(`api/v1/rentals/${id}`, rental);
  }
}
