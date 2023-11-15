import { Injectable } from '@angular/core';
import { RegisterForm } from '../../RegisterForm';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { apiconfig } from './apiConfig';
import { catchError, map, throwError } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { apiError } from './helperfun/apiError';

import jwt_decode from 'jwt-decode';
import * as moment from 'moment';

interface loginresponce {
  token: string;
  message: string;
}
class decotedtoken {
  exp = 0;
  username = '';
  userId = '';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private decodedtokenx: decotedtoken | any;
  redirectUrl: any;
  constructor(private http: HttpClient) {
    this.decodedtokenx = new decotedtoken();
  }

  register(formdata: RegisterForm) {
    return this.http
      .post(`${apiconfig.rootUrl}${apiconfig.register}`, formdata)
      .pipe(
        catchError((reserror: HttpErrorResponse) => {
          const errors = apiError(reserror);
          return throwError(() => errors);
        })
      );
  }

  login(formdata: FormGroup) {
    return this.http
      .post<loginresponce>(`${apiconfig.rootUrl}${apiconfig.login}`, formdata)
      .pipe(
        map((token) => {
          const savetokenx = this.saveToken(token.token);

          if (!savetokenx) {
            return null;
          }
          return savetokenx;
        })
      );
  }

  checkauthsatus(): boolean {
    const authtoken = localStorage.getItem('bwm_auth_tokn');
    if (!authtoken) {
      return false;
    }

    const decodedtokenyy = this.getDecodedAccessToken(authtoken);
    if (!decodedtokenyy) {
      return false;
    }
    this.decodedtokenx = decodedtokenyy;

    return true;
  }

  logout() {
    localStorage.removeItem('bwm_auth_tokn');
    this.decodedtokenx = new decotedtoken();
  }
  private saveToken(token: string): string | null {
    const decodedtokenm = this.getDecodedAccessToken(token);

    if (!decodedtokenm) {
      return null;
    }
    this.decodedtokenx = decodedtokenm;

    localStorage.setItem('bwm_auth_tokn', token);
    return token;
  }

  getDecodedAccessToken(token: string) {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  get isauthenticated(): boolean {
    const isauth = moment().isBefore(this.expiration);

    return isauth;
  }
  private get expiration() {
    return moment.unix(this.decodedtokenx.exp);
  }

  get username(): string {
    const x = this.decodedtokenx.username;
    return x;
  }
  get token() {
    return localStorage.getItem('bwm_auth_tokn') || '';
  }
}
