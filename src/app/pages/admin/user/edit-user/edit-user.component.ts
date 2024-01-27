import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../../../types/user';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  error: string = '';
  form!: FormGroup;
  id!: string;
  user!: User;
  submitted = false;
  constructor(
    private fb: FormBuilder,
    public userService: UserService,
    private router: Router,
    private notification: ToasterService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      "account": ["", [Validators.required]],
      "email": ["", [Validators.required, Validators.email]],
      "fullName": ["", [Validators.required]],
      "role": ["", [Validators.required]],
    })
    this.id = this.route.snapshot.params['id'];
    this.getUser(this.id);
  }

  getUser(id: string) {
    this.spinner.show();
    this.userService.getDetail(id).subscribe((data: any) => {
      this.spinner.hide();
      this.user = data;
      this.setValue();
    }, (error) => {
      this.spinner.hide();
      this.error = error.message
    })
  }


  setValue() {
    if (this.user) {
      this.form.patchValue({
        id: this.user.id,
        account: this.user.account,
        email: this.user.email,
        fullName: this.user.fullName,
        role: this.user.role
      });
    }
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
    this.userService.update(this.id, data).subscribe((res:any)=>{
      this.notification.success('User updated Successfull!', '')
      this.router.navigateByUrl('admin/users');
    },
    (error) => {
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }
}
