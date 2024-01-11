import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoviesService } from '../../../../services/movies.service';
import { Router } from '@angular/router';
import { Category } from '../../../../types/category';
import { CategoryService } from '../../../../services/category.service';

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
  constructor( public moviesService: MoviesService, public categoryService: CategoryService, private router: Router) {}
  categories: Category[] = [];
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      poster:new FormControl('',Validators.required),
      director:new FormControl('',Validators.required),
      cast:new FormControl('',Validators.required),
      genre:new FormControl('2',Validators.required),
      runingTime:new FormControl('',Validators.required),
      language:new FormControl('',Validators.required),
      trailer:new FormControl('',Validators.required),
      imgBanner:new FormControl('',Validators.required),
    })
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data
      console.log(data);

    }, (error) => {
      this.error = error.message
    })
  }

  get f(){
    return this.form.controls;
  }
  submit(){
    console.log(this.form.value);
    // this.postService.create(this.form.value).subscribe((res:any)=>{
    //   alert("Post Created Successfull!.");
    //   this.router.navigateByUrl('post/index');
    // })
  }
}
