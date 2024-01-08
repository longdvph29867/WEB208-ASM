import { Component, Input, OnInit } from '@angular/core';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { moviesList } from '../../../assets/data';
import { CommonModule } from '@angular/common';
import { Movie } from '../../common/movie';
import { MoviesService } from '../../services/movies.service';
import { catchError, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [ CommonModule, MovieItemComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css',
  providers: [MoviesService]
})
export class MoviesListComponent {
  @Input() moviesList!: Movie[];
}
