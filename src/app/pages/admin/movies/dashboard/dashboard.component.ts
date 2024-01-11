import { Component, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgFor, SlicePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Movie } from '../../../../types/movie';
import { MoviesService } from '../../../../services/movies.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterModule, SlicePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  moviesList:Movie[]=[];
  error: string = '';
  // movieService = inject(MoviesService);
  constructor(private movieService: MoviesService, private spinner: NgxSpinnerService) {}
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
  deletePost(id: string){
    if(confirm('Có chắc chắn xoá không!')) {
      this.movieService.delete(id).subscribe(res =>{
        this.moviesList = this.moviesList.filter(item=>item._id !==id);
        alert("Movie Deleted Successfull !.")
      })
    }
  }
}
