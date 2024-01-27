import { Component } from '@angular/core';
import { Category } from '../../../../types/category';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoviesService } from '../../../../services/movie/movies.service';
import { CategoryService } from '../../../../services/categoty/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  error!: string;
  slug!: string;
  category!: Category;
  form!: FormGroup;
  submitted = false;

  constructor(
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    private notification: ToasterService,
    private spinner: NgxSpinnerService,
    private router: Router) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      categoryName: new FormControl('', [Validators.required]),
    })
    this.slug = this.route.snapshot.params['slug'];

    this.getCategory(this.slug);
  }

  setValue() {
    if (this.category) {
      this.form.patchValue({
        categoryName: this.category.categoryName,
      });
    }
  }

  getCategory(slug: string) {
    this.spinner.show();
    this.categoryService.getDetail(slug).subscribe((data: any) => {
      this.spinner.hide();
      this.category = data.data;
      this.setValue();
    }, (error) => {
      this.spinner.hide();
      this.error = error.message
    })
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value
    this.categoryService.update( this.slug, data).subscribe((res:any)=>{
      this.notification.success('Category update Successfull!', '')
      this.router.navigateByUrl('admin/categories');
    },
    (error) => {
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }
}
