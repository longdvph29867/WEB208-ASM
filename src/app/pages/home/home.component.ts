import { Component, inject } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { TrailersComponent } from '../../components/trailers/trailers.component';
import { LatestNewsComponent } from '../../components/latest-news/latest-news.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MoviesListComponent } from '../../components/movies-list/movies-list.component';
import { MoviesService } from '../../services/movie/movies.service';
import { Movie } from '../../types/movie';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ BannerComponent, MoviesListComponent, TrailersComponent, LatestNewsComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  moviesList:Movie[]=[];
  error: string = '';
  movieService = inject(MoviesService);
  // constructor(private movieService: MoviesService) {}
  constructor(private spinner: NgxSpinnerService) {

  }

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
}
