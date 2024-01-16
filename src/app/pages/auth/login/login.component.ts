import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../../services/toaster.service';

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
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    ) {
    this.form = this.fb.group({
      "email": ["", [Validators.required, Validators.email]],
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
    this.authService.login(this.form.value).subscribe((res:any)=>{
      this.notification.success('Login Successfull!', '')
      console.log(res.data);

      this.router.navigateByUrl('/');
    },
    (error) => {
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }
}
