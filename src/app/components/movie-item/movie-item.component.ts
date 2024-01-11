import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movie';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.css'
})
export class MovieItemComponent {
  @Input() movie!: Movie;
}
