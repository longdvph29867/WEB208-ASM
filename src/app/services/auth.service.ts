import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../types/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://angular-movies-api.vercel.app/auth';
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
  constructor(private httpClient: HttpClient) { }
  login(data: Login): Observable<any> {
    return this.httpClient.post<any>(this.url + "/login", JSON.stringify(data), this.httpOptions);
  }
}
