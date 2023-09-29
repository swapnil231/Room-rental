import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Customvalidators } from 'src/app/shared/validators/functionx';

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
    private customvalidators: Customvalidators
  ) {}
  loginform!: FormGroup;
  ngOnInit(): void {
    this.initform();
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
    this.loginform.setValidators(
      this.customvalidators.sameAsValidator(['password', 'email'])
    );
  }

  login() {
    alert(JSON.stringify(this.loginform.value));
  }

  get email(): AbstractControl | null {
    return this.loginform.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginform.get('password');
  }
}
