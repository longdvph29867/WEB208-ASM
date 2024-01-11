import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = 'https://angular-movies-api.vercel.app/categories/';
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
  // http = inject(HttpClient)
  // constructor() {}
  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url);
  }
}
