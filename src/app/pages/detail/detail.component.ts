import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../common/movie';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SidebarComponent, RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  movie:Partial<Movie> = {};
  error: string = '';
  movieService = inject(MoviesService);
  route = inject(ActivatedRoute);

  constructor() {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.getDetail(id);
      } else {
        return;
      }
    });

  }
  getDetail(id: string) {
    this.movieService.getDetail(id).subscribe((data: any) => {
      this.movie = data
    }, (error) => {
      this.error = error.message
    })
  }
}
