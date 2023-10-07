import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bookingModel } from 'src/app/auth/shared/bookingModel/bookingModel';
import { apiconfig } from 'src/app/auth/shared/service/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  getbooking(rentalId: string): Observable<bookingModel[]> {
    return this.http.get<bookingModel[]>(
      `${apiconfig.rootUrl}${apiconfig.booking}?rental=${rentalId}`
    );
  }

  creatbooking(booking: bookingModel): Observable<bookingModel> {
    return this.http.post<bookingModel>(
      `${apiconfig.rootUrl}${apiconfig.booking}`,
      booking
    );
  }
}
