import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterForm } from '../RegisterForm';
import { AuthService } from '../shared/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  error: any;
  errors = [];
  registerform!: RegisterForm;
  emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  value = 'ram';

  register(form: NgForm) {
    this.validateinput(form);
    if (form.invalid) {
      return;
    }
    // alert(JSON.stringify(this.registerform));
    this.authservice.register(this.registerform).subscribe(
      {
        next: () => {
          // alert('register succefully');
          form.resetForm();
          this.showSuccess('you are sucessfully Register', 'sucess');
          this.router.navigate(['/login'], {
            queryParams: { message: 'you are sucessfully Register' },
          });
        },
        error: (err) => {
          this.error = JSON.stringify(err[0].detail);
          this.showSuccess(this.error, 'Failed');
        },
      }
      //   (_) => {
      //   alert('register succefully');
      //   form.resetForm();
      //   this.router.navigateByUrl('login');
      // }
    );
  }
  validateinput(form: NgForm) {
    Object.keys(form.controls).forEach((controlname) =>
      form.controls[controlname].markAsDirty()
    );
  }

  ngOnInit(): void {
    this.registerform = new RegisterForm();
  }

  clear(form: NgForm) {
    form.resetForm();
    this.error = null;
  }

  showSuccess(msg: string, title: string) {
    this.toastr.success(msg, title, {
      timeOut: 3000,
      closeButton: true,
    });
  }
}
