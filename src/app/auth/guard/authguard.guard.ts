import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';

export const authguardGuard: CanActivateFn = (
  route,
  state,
  auth_service: AuthService = inject(AuthService),
  router_: Router = inject(Router)
) => {
  function checkifnavigate(url: string): boolean {
    if (auth_service.isauthenticated) {
      return true;
    }
    auth_service.redirectUrl = url;
    router_.navigate(['/login']);
    return false;
  }

  return checkifnavigate(state.url);
};

export const GuestguardGuard: CanActivateFn = (
  route,
  state,
  auth_service: AuthService = inject(AuthService),
  router_: Router = inject(Router)
) => {
  function checkifnavigate(url: string): boolean {
    if (auth_service.isauthenticated) {
      router_.navigate(['/rental']);
      return false;
    }
    return true;
  }
  return checkifnavigate(state.url);
};
