import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // private url = 'https://angular-movies-api.vercel.app/categories/';
  private url = 'https://api-movies-azure.vercel.app/categories/';
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
  getDetail(id: string): Observable<Category> {
    return this.httpClient.get<Category>(this.url + id);
  }
  create(category: Category): Observable<any> {
    return this.httpClient.post(this.url, JSON.stringify(category), this.httpOptions);
  }
  update(id: string, category: Category): Observable<any> {
    return this.httpClient.put(this.url + id, JSON.stringify(category), this.httpOptions);
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + id);
  }
}
