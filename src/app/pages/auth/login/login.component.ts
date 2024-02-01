import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../../services/toaster/toaster.service';
import { LocalService } from '../../../services/local/local.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form!: FormGroup;
  submitted = false;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    private localService: LocalService,
    ) {
    this.form = this.fb.group({
      "email": ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      "password":["", Validators.required]
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.spinner.show();
    this.authService.login(this.form.value).subscribe((res:any)=>{
      this.notification.success('Login Successfull!', '')
      this.localService.set(res.data)
      this.spinner.hide();
      if(res.data.role === 'admin') {
        location.href = '/admin/movies';
      }
      else {
        location.href = '/';
      }
    },
    (error) => {
      this.spinner.hide();
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }
}
