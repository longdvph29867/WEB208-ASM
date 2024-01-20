import { Injectable } from '@angular/core';
import { UserInfo } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  USER_INFO: string = 'USER_INFO_MOVIE';
  constructor() { }
  get(): UserInfo | null {
    const jsonData = localStorage.getItem(this.USER_INFO);
    return JSON.parse((jsonData as string));
  };
  set(userInfo: UserInfo) {
    const jsonData = JSON.stringify(userInfo);
    localStorage.setItem(this.USER_INFO, jsonData);
  };
  remove() {
    localStorage.removeItem(this.USER_INFO);
  }
}
