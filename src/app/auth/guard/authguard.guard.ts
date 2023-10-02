import { CanActivateFn, Router } from '@angular/router';
import { Inject, inject } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';

export const authguardGuard: CanActivateFn = (
  route,
  state,
  auth_service: AuthService = inject(AuthService),
  router_: Router = inject(Router)
) => {
  const url = state.url;

  // // creating pivate variable
  // function authpage(): boolean {
  //   let priavateauth: any;

  //   let x =
  //     url.includes('login') ||
  //     url.includes('register') ||
  //     url.includes('rental');

  //   const y: boolean = x ? true : false;

  //   const obj = {
  //     getvalue: function () {
  //       return priavateauth;
  //     },
  //     setvalue: function (value: any) {
  //       priavateauth = value;
  //     },
  //   };
  //   obj.setvalue(y);

  //   console.log(priavateauth);
  //   return priavateauth;
  // }

  // const handleauthstate = (): boolean => {
  //   if (authpage()) {
  //     console.log('2');
  //     router_.navigate(['/rental']);
  //     return false;
  //   }
  //   console.log('3');
  //   return true;
  // };

  // const handleNOTauthstate = (): boolean => {
  //   if (authpage()) {
  //     console.log('4');

  //     return true;
  //   }
  //   router_.navigate(['/login']);
  //   console.log('5');

  //   return false;
  // };

  // // check if authenticated
  // return auth_service.isauthenticated
  //   ? handleauthstate()
  //   : handleNOTauthstate();

  function checkifnavigate(url: string): boolean {
    if (auth_service.isauthenticated) {
      console.log('0');
      console.log(url);

      return true;
    }
    auth_service.redirectUrl = url;
    console.log('1');
    console.log(url);
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
  const url = state.url;

  function checkifnavigate(url: string): boolean {
    if (auth_service.isauthenticated) {
      console.log('2');
      console.log(url);
      router_.navigate(['/rental']);
      return false;
    }
    console.log('3');
    console.log(url);
    return true;
  }

  return checkifnavigate(state.url);
};
