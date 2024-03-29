import { Component } from '@angular/core';
import { CategoryService } from '../../../../services/categoty/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { Category } from '../../../../types/category';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBoxComponent } from '../../../../components/confirm-box/confirm-box.component';

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
    private dialog: MatDialog
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
  delete(id: string){
    this.categoryService.delete(id).subscribe(res =>{
      this.categoriesList = this.categoriesList.filter(item=>item._id !==id);
      this.notification.success('Category delete Successfull!', '')
    })
  }

  openConfirmBox(id: string) {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '300px',
      data: { title: 'Bạn có chắc chắn xoá không!', message: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id)
      } else {
      }
    });
  }
}
