import { Component, OnInit, inject } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { TrailersComponent } from '../../components/trailers/trailers.component';
import { LatestNewsComponent } from '../../components/latest-news/latest-news.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MoviesListComponent } from '../../components/movies-list/movies-list.component';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../common/movie';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, BannerComponent,MoviesListComponent, TrailersComponent, LatestNewsComponent, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  moviesList:Movie[]=[];
  error: string = '';
  // constructor(public movieService: MoviesService) {}
  movieService = inject(MoviesService);
  constructor() {}
  ngOnInit(): void {
    this.getAllMovies();
  }
  getAllMovies() {
    this.movieService.getAllMovies().subscribe((data: any) => {

      this.moviesList = data
    }, (error) => {
      this.error = error.message
    })
  }
}
