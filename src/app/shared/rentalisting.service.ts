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
    return this.http.get<Rental[]>(`http://localhost:4200/api/v1/rentals`);
  }

  getRentalsbycity(city: string): Observable<Rental[]> {
    return this.http.get<Rental[]>(
      `http://localhost:4200/api/v1/rentals?city=${city}`
    );
  }

  getrentaldetails(rentalId: any): Observable<Rental> {
    return this.http.get<Rental>(
      `http://localhost:4200/api/v1/rentals/${rentalId}`
    );
    // return this.rentals.filter((value)=>(value._id===id))
  }

  creatrentals(newrental: Rental): Observable<Rental> {
    // const token = this.authservice.token;

    // const httpoption = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${token}`,
    //   }),
    // };

    return this.http.post<Rental>(
      `http://localhost:4200/api/v1/rentals`,
      newrental
    );
  }

  private bookingdata = new BehaviorSubject<any>(0);
  cast = this.bookingdata.asObservable();

  sendbookingdata(setvalue: any) {
    this.bookingdata.next(setvalue);
  }

  // private bookingdata2 = new BehaviorSubject<any>(0);
  // cast2 = this.bookingdata.asObservable();

  // sendbookingdata2(setvalue: any) {
  //   this.bookingdata.next(setvalue);
  // }

  getAuthUserRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`http://localhost:4200/api/v1/rentals/me`);
  }

  getverifiedUser(id: any): Observable<any> {
    return this.http.get<any>(
      `http://localhost:4200/api/v1/rentals/${id}/verify-user`
    );
  }

  deleterentals(id: any) {
    return this.http.delete<Rental[]>(
      `http://localhost:4200/api/v1/rentals/${id} `
    );
  }
  updaterentals(id: any, rental: Rental) {
    return this.http.patch<Rental[]>(
      `http://localhost:4200/api/v1/rentals/${id}`,
      rental
    );
  }
}
