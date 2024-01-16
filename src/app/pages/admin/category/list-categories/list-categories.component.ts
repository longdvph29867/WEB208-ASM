import { Component } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../../../services/toaster.service';
import { Category } from '../../../../types/category';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-categories',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './list-categories.component.html',
  styleUrl: './list-categories.component.css'
})
export class ListCategoriesComponent {
  categoriesList:Category[]=[];
  error: string = '';
  constructor(
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    ) {}

  ngOnInit(): void {
    this.getAllMovies();
  }
  getAllMovies() {
    this.spinner.show();
    this.categoryService.getAll().subscribe((data: any) => {
      this.categoriesList = data
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.error = error.message
    })
  }
  deletePost(id: string){
    if(confirm('Có chắc chắn xoá không!')) {
      this.categoryService.delete(id).subscribe(res =>{
        this.categoriesList = this.categoriesList.filter(item=>item._id !==id);
        this.notification.success('Category delete Successfull!', '')
      })
    }
  }
}
