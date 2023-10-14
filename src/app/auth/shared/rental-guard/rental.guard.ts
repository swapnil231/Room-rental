import { CanActivateFn, Router } from '@angular/router';
import { Inject, inject } from '@angular/core';

import { RentalistingService } from 'src/app/shared/rentalisting.service';
import { Observable, catchError, map, of } from 'rxjs';

export const rentalGuard: CanActivateFn = (
  route,
  state,
  rental_service: RentalistingService = inject(RentalistingService),
  router_: Router = inject(Router)
): Observable<boolean> => {
  const { rentalId } = route.params;

  return rental_service.getverifiedUser(rentalId).pipe(
    map((_) => true),
    catchError((_) => {
      router_.navigate(['/rental']);
      return of(false);
    })
  );
};
