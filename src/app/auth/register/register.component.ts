import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { RegisterForm } from '../RegisterForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerform!: RegisterForm;
  emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  value = 'ram';

  register(form: NgForm) {
    alert(JSON.stringify(this.registerform));
    this.validateinput(form);
    if (form.invalid) {
      return;
    }
  }
  validateinput(form: NgForm) {
    Object.keys(form.controls).forEach((controlname) =>
      form.controls[controlname].markAsDirty()
    );
  }

  ngOnInit(): void {
    this.registerform = new RegisterForm();
  }
}
