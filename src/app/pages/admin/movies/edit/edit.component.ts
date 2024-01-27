import { Component } from '@angular/core';
import { Movie } from '../../../../types/movie';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../../../services/movie/movies.service';
import { CategoryService } from '../../../../services/categoty/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../types/category';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  submitted = false;

  constructor(
    public moviesService: MoviesService,
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    private router: Router) {}
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
    this.id = this.route.snapshot.params['id'];
    this.getAllCategory();
    this.getMovie(this.id);
  }

  setValue() {
    if (this.movie) {
      this.form.patchValue({
        name: this.movie.name,
        poster: this.movie.poster,
        director: this.movie.director,
        cast: this.movie.cast,
        genre: this.movie.genre[0],
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

  submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const data = {...this.form.value, genre: [this.form.value.genre]}
    this.moviesService.update( this.id, data).subscribe((res:any)=>{
      this.notification.success('Movie update Successfull!', '')
      this.router.navigateByUrl('admin/movies');
    },
    (error) => {
      this.notification.error(error.error.message!, '')
      console.log(error);
    })
  }

}
