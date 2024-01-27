import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  error: string = '';
  form!: FormGroup;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private router: Router,
    private notification: ToasterService,
    ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      "account": ["", [Validators.required]],
      "email": ["", [Validators.required, Validators.email]],
      "fullName": ["", [Validators.required]],
      "role": ["", [Validators.required]],
      "password": ["", [Validators.required]],
      "confirmPassword": ["", [Validators.required]],
    }, { validator: this.checkPasswords })
  }

  checkPasswords(g: FormGroup) {
    const pass = g.controls['password'].value;
    const confirmPass = g.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true };
  }

  get f(){
    return this.form.controls;
  }
  submit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }

    const data = this.form.value
    delete data.confirmPassword;
    this.userService.create(data).subscribe((res:any)=>{
      this.notification.success('User created Successfull!', '')
      this.router.navigateByUrl('admin/users');
    },
    (error) => {
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }
}
