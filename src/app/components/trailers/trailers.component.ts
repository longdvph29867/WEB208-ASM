import { Component, Input } from '@angular/core';
import { Movie } from '../../common/movie';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-trailers',
  standalone: true,
  imports: [NgFor],
  templateUrl: './trailers.component.html',
  styleUrl: './trailers.component.css'
})
export class TrailersComponent {
  @Input() moviesList!: Movie[];

}
