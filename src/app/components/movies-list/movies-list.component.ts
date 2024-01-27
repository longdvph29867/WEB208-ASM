import { Component, Input, OnInit } from '@angular/core';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { NgFor } from '@angular/common';
import { Movie } from '../../types/movie';
import { MoviesService } from '../../services/movie/movies.service';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [ NgFor, MovieItemComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css',
  providers: [MoviesService]
})
export class MoviesListComponent {
  @Input() moviesList!: Movie[];
}
