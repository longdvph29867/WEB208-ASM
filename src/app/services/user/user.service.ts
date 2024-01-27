import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../types/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://angular-movies-api.vercel.app/users/';
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url);
  }
  getDetail(id: string): Observable<User> {
    return this.httpClient.get<User>(this.url + id);
  }
  create(user: User): Observable<any> {
    return this.httpClient.post(this.url, JSON.stringify(user), this.httpOptions);
  }
  update(id: string, user: User): Observable<any> {
    return this.httpClient.put(this.url + id, JSON.stringify(user), this.httpOptions);
  }
  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.url + id);
  }
}
