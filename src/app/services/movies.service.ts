import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../types/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private url = 'https://angular-movies-api.vercel.app/movies/';
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
  // http = inject(HttpClient)
  // constructor() {}
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(this.url);
  }
  getDetail(id: string): Observable<Movie> {
    return this.httpClient.get<Movie>(this.url + id);
  }
  create(movie: Movie): Observable<any> {
    return this.httpClient.post(this.url, JSON.stringify(movie), this.httpOptions);
  }
  update(id: string, movie: Movie): Observable<any> {
    return this.httpClient.post(this.url + id, JSON.stringify(movie), this.httpOptions);
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + id);
  }
}
