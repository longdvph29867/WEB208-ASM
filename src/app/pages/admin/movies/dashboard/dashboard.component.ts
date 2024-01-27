import { Component, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgFor, SlicePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../../../types/movie';
import { MoviesService } from '../../../../services/movie/movies.service';
import { DescPipe } from '../../../../pipes/desc.pipe';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { ConfirmBoxComponent } from '../../../../components/confirm-box/confirm-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterModule, DescPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  moviesList:Movie[]=[];
  error: string = '';
  // movieService = inject(MoviesService);
  constructor(
    private movieService: MoviesService,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    private dialog: MatDialog
    ) {}
  // constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getAllMovies();
  }
  getAllMovies() {
    this.spinner.show();
    this.movieService.getAll().subscribe((data: any) => {
      this.moviesList = data
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.error = error.message
    })
  }
  delete(id: string){
    this.movieService.delete(id).subscribe(res =>{
      this.moviesList = this.moviesList.filter(item=>item._id !==id);
      this.notification.success('Movie delete Successfull!', '')
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
