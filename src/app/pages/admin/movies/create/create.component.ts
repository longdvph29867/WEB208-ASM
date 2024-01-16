import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoviesService } from '../../../../services/movies.service';
import { Router } from '@angular/router';
import { Category } from '../../../../types/category';
import { CategoryService } from '../../../../services/category.service';
import { ToasterService } from '../../../../services/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  error: string = '';
  form!: FormGroup;
  submitted = false;
  constructor(
    public moviesService: MoviesService,
    public categoryService: CategoryService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    ) {}
  categories: Category[] = [];
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      poster:new FormControl('',Validators.required),
      director:new FormControl('',Validators.required),
      cast:new FormControl('',Validators.required),
      genre:new FormControl('',Validators.required),
      runingTime:new FormControl('',Validators.required),
      language:new FormControl('',Validators.required),
      trailer:new FormControl('',Validators.required),
      imgBanner:new FormControl('',Validators.required),
    })
    this.getAllCategory();
  }

  getAllCategory() {
    this.spinner.show();
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data
      this.spinner.hide();
    }, (error) => {
      this.error = error.message
      this.spinner.hide();
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
    const data = {...this.form.value, genre: [this.form.value.genre]}
    this.moviesService.create(data).subscribe((res:any)=>{
      this.notification.success('Movie created Successfull!', '')
      this.router.navigateByUrl('admin/movies');
    },
    (error) => {
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }
}
