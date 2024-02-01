import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MoviesService } from '../../../../services/movie/movies.service';
import { Router } from '@angular/router';
import { Category } from '../../../../types/category';
import { CategoryService } from '../../../../services/categoty/category.service';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageService } from '../../../../services/image/image.service';

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
  selectedImageBase64: string | null = null;
  submitted = false;
  constructor(
    public moviesService: MoviesService,
    public categoryService: CategoryService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    private imageService: ImageService,
    private fb: FormBuilder,
    ) {}
  categories: Category[] = [];
  ngOnInit(): void {
    this.form = this.fb.group({
      "name": ["", [Validators.required]],
      "poster": ["", [Validators.required]],
      "director": ["", [Validators.required]],
      "cast": ["", [Validators.required]],
      "genre": ["", [Validators.required]],
      "runingTime": ["", [Validators.required]],
      "language": ["", [Validators.required]],
      "trailer": ["", [Validators.required]],
      "imgBanner": ["", [Validators.required]],
      "posterSource": ["", [Validators.required]],
    }, { validator: this.checkImage })
    this.getAllCategory();
  }

  checkImage(g: FormGroup) {
    const file = g.controls['posterSource'].value;
    if(file) {
      const fileExtension = file.name.split('.').pop();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      if(!(fileExtension && allowedExtensions.includes(fileExtension.toLowerCase()))) {
        return { 'fileTypeExceeded': true };
      }
    }
    if (file && file.size > 1024 *1024) {
      return { 'fileSizeExceeded': true };
    }
    return null;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if(file) {
      const fileExtension = file.name.split('.').pop();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      if (fileExtension && allowedExtensions.includes(fileExtension.toLowerCase())) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.selectedImageBase64 = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
    else {
      this.selectedImageBase64 = null;
    }

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        posterSource: file
      });
    }
  }

  handleChangeImage(event: any): void {
    // const file = event.target.files && event.target.files[0];
    this.onFileSelected(event)
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

  postImages(file: any): void {
    const formData = new FormData();
    formData.append('images', file);
    this.imageService.create(formData).subscribe((res:any)=>{
        return res.data[0].url
    }, (error) => {
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      // Object.keys(this.form.controls).forEach(key => {
      //   const controlErrors = this.form.get(key)?.errors;
      //   if (controlErrors != null) {
      //     console.log(key, controlErrors);
      //   }
      // });

      return;
    }

    const file = this.form.get('posterSource')?.value;
    const formData = new FormData();
    formData.append('images', file);

    this.spinner.show();
    this.imageService.create(formData).subscribe((res:any)=>{
      const data = {...this.form.value, genre: [this.form.value.genre], poster: res.data[0].url}
      delete data.posterSource;

      this.moviesService.create(data).subscribe((res:any)=>{
        this.spinner.hide();
        this.notification.success('Movie created Successfull!', '')
        this.router.navigateByUrl('admin/movies');
      },
      (error) => {
        this.spinner.hide();
        this.notification.error(error.error.message!, '')
        console.log(error);
      })

    }, (error) => {
      this.spinner.hide();
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }
}
