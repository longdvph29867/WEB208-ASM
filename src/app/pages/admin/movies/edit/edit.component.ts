import { Component } from '@angular/core';
import { Genre, Movie } from '../../../../types/movie';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../../../services/movie/movies.service';
import { CategoryService } from '../../../../services/categoty/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../types/category';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageService } from '../../../../services/image/image.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  error!: string;
  id!: string;
  categories!: Category[];
  movie!: Movie;
  form!: FormGroup;
  selectedImageBase64: string | null = null;
  submitted = false;

  constructor(
    public moviesService: MoviesService,
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    private router: Router,
    private fb: FormBuilder,
    private imageService: ImageService,
    ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      "name": ["", [Validators.required]],
      "poster": [""],
      "director": ["", [Validators.required]],
      "cast": ["", [Validators.required]],
      "genre": ["", [Validators.required]],
      "runingTime": ["", [Validators.required]],
      "language": ["", [Validators.required]],
      "trailer": ["", [Validators.required]],
      "imgBanner": ["", [Validators.required]],
      "posterSource": [""],
    }, { validator: this.checkImage })
    this.id = this.route.snapshot.params['id'];
    this.getAllCategory();
    this.getMovie(this.id);
  }

  checkImage(g: FormGroup) {
    const file = g.controls['posterSource'].value;
    if(file) {
      const fileExtension = file.name.split('.').pop();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      if(!(fileExtension && allowedExtensions.includes(fileExtension.toLowerCase()))) {
        console.log('ko phai img');
        return { 'fileTypeExceeded': true };
      }
    }
    if(file && file.size > 1024 *1024) {
      return { 'fileSizeExceeded': true };
    }
    return null;
  }

  setValue() {
    if (this.movie) {
      this.selectedImageBase64 = this.movie.poster
      const genre = this.movie.genre[0]
      this.form.patchValue({
        name: this.movie.name,
        poster: '',
        director: this.movie.director,
        cast: this.movie.cast,
        genre: (genre as Genre)._id,
        runingTime: this.movie.runingTime,
        language: this.movie.language,
        trailer: this.movie.trailer,
        imgBanner: this.movie.imgBanner,
      });
    }
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data
    }, (error) => {
      this.error = error.message
    })
  }

  getMovie(id: string) {
    this.spinner.show();
    this.moviesService.getDetail(id).subscribe((data: any) => {
      this.spinner.hide();
      this.movie = data
      this.setValue();
    }, (error) => {
      this.spinner.hide();
      this.error = error.message
    })
  }

  get f(){
    return this.form.controls;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const fileExtension = file.name.split('.').pop();
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    if (file && (fileExtension && allowedExtensions.includes(fileExtension.toLowerCase()))) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.selectedImageBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    else {
      this.selectedImageBase64 = this.movie.poster;
    }
    if (file) {
      this.form.patchValue({
        posterSource: file
      });
    }
  }

  handleChangeImage(event: any): void {
    this.onFileSelected(event)
  }

  putMovie(id: string, data: Movie) {
    this.moviesService.update( id, data).subscribe((res:any)=>{
      this.spinner.hide();
      this.notification.success('Movie update Successfull!', '')
      this.router.navigateByUrl('admin/movies');
    },
    (error) => {
      this.spinner.hide();
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }

  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if(this.form.get('posterSource')?.value) {
      const file = this.form.get('posterSource')?.value;
      const formData = new FormData();
      formData.append('images', file);

      this.spinner.show();
      this.imageService.create(formData).subscribe((res:any)=>{
        const data = {...this.form.value, genre: [this.form.value.genre], poster: res.data[0].url}
        delete data.posterSource;
        this.putMovie(this.id, data)
      }, (error) => {
        this.spinner.hide();
        this.notification.error(error.error.message!, '')
        console.log(error);
      })
    }
    else {
      const data = {...this.form.value, genre: [this.form.value.genre], poster: this.selectedImageBase64}
      delete data.posterSource;

      this.spinner.show();
      this.putMovie(this.id, data)
    }
  }

}
