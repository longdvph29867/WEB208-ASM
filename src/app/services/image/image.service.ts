import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalService } from '../local/local.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = 'https://api-movies-azure.vercel.app/images/';

  token = this.localService.get()?.accessToken
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  }
  constructor(
    private httpClient: HttpClient,
    private localService: LocalService,
  ) { }
  create(data: any): Observable<any> {
    return this.httpClient.post(this.url, data, this.httpOptions);
  }
}
