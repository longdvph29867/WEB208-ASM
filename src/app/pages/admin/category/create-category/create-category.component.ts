import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../../types/category';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../services/categoty/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent {
  error: string = '';
  form!: FormGroup;
  submitted = false;
  constructor(
    public categoryService: CategoryService,
    private router: Router,
    private notification: ToasterService,
    ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),
    })
  }


  get f(){
    return this.form.controls;
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value
    this.categoryService.create(data).subscribe((res:any)=>{
      this.notification.success('Category created Successfull!', '')
      this.router.navigateByUrl('admin/categories');
    },
    (error) => {
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }
}
