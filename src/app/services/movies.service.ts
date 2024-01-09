import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../common/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = 'https://angular-movies-api.vercel.app/movies/';
  http = inject(HttpClient)
  constructor() {}
  // constructor(private http: HttpClient) { }
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.url);
  }
  getDetail(id: string) {
    return this.http.get<Movie>(this.url + id);
  }
}
