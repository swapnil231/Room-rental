import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Customvalidators } from 'src/app/shared/validators/functionx';
import { LoginForm } from '../RegisterForm';
import { AuthService } from '../shared/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeoutConfig } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    private fb: FormBuilder,
    private customvalidators: Customvalidators,
    private authservice: AuthService,
    private activatedRoutes: ActivatedRoute,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.clearnotifytimeout && clearTimeout(this.clearnotifytimeout);
    // this.loginmessagesetime && clearTimeout(this.loginmessagesetime);
    this.timeout && clearTimeout(this.timeout);
    this.loginMessage = null;
  }
  loginMessage: any;
  loginmessagesetime: any;
  timeout: any;
  notifyMessage: any;
  errror: any;
  loginform!: FormGroup;
  clearnotifytimeout: any;
  ngOnInit(): void {
    this.initform();
    this.getQuryparam();
  }

  getQuryparam() {
    this.activatedRoutes.queryParams.subscribe((res) => {
      console.log(res);

      this.notifyMessage = JSON.stringify(res?.['message']);

      this.clearnotifytimeout = setTimeout(() => {
        // alert('yes');
        this.notifyMessage = null;
        this.router.navigate([], {
          queryParams: {
            message: null,
          },
          queryParamsHandling: 'merge',
        });
      }, 10000);
    });
  }

  initform() {
    this.loginform = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.emailPattern),
          this.customvalidators.forbiddenEmailValidator('yahoo@gmail.com'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // this.loginform.setValidators(
    //   this.customvalidators.sameAsValidator(['password', 'email'])
    // );
  }

  login() {
    // alert(JSON.stringify(this.loginform.value));
    this.errror = null;
    this.authservice.login(this.loginform.value).subscribe({
      next: (res) => {
        console.log(JSON.stringify(res));

        if (!res) {
          this.errror = 'oops something went wrong';

          return;
        }

        if (this.authservice.redirectUrl) {
          this.router.navigate([this.authservice.redirectUrl]);
          this.authservice.redirectUrl = null;
        } else {
          this.timeout = setTimeout(() => {
            this.router.navigate(['/']);
          }, 500);
        }
        this.loginform.reset();
        this.loginMessage = 'login sucessfully';
        // this.loginmsg();
      },

      error: (err) => {
        this.errror = JSON.stringify(err.error.errors[0].detail);

        // alert(
        //   // JSON.stringify(err.error.errors[0].title) +
        //   //   JSON.stringify(err.error.errors[0].detail)
        //   this.errror
        // );
      },
    });
  }

  clear() {
    this.loginform.reset();
    this.errror = null;
  }

  // loginmsg() {
  //   this.loginmessagesetime = setTimeout(() => {
  //     this.loginMessage = 'login sucessfully';
  //   }, 500);
  // }

  get email(): AbstractControl | null {
    return this.loginform.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginform.get('password');
  }
}
