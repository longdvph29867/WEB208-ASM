import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../types/movie';
import { LocalService } from '../local/local.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // private url = 'https://angular-movies-api.vercel.app/movies/';
  private url = 'https://api-movies-azure.vercel.app/movies/';
  constructor(
    private httpClient: HttpClient,
    private localService: LocalService,
    ) { }
  token = this.localService.get()?.accessToken
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': `Bearer ${this.token}`
    })
  }
  // http = inject(HttpClient)
  // constructor() {}
  getAll(page:number = 1, limit:number = 10, genre: string[] = [], key: string = '', runingTime: string = ''): Observable<Movie[]> {
    let url = this.url + `?page=${page}&limit=${limit}`
    if(genre.length > 0) {
      url = url + `&genre=${genre.join(',')}`
    }
    if(key) {
      url = url + `&search=${key}`
    }

    if(runingTime === 'lower_100') {
      url = url + `&lower_time=100`
    }
    else if (runingTime === '100_120') {
      url = url + `&greater_time=100&lower_time=120`
    }
    else if (runingTime === 'greater_120') {
      url = url + `&greater_time=120`
    }

    return this.httpClient.get<Movie[]>(url, this.httpOptions);
  }
  getSearch( key: string): Observable<Movie> {
    return this.httpClient.get<Movie>(this.url + `?search=${key}`, this.httpOptions);
  }
  getDetail(id: string): Observable<Movie> {
    return this.httpClient.get<Movie>(this.url + id, this.httpOptions);
  }
  create(movie: Movie): Observable<any> {
    return this.httpClient.post(this.url, JSON.stringify(movie), this.httpOptions);
  }
  update(id: string, movie: Movie): Observable<any> {
    return this.httpClient.put(this.url + id, JSON.stringify(movie), this.httpOptions);
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + id, this.httpOptions);
  }
}
