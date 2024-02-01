import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  currentUrl: string = '';
  routers: {
    movies: string,
    categories: string,
    users: string,
  } = {
    movies: 'movies',
    categories: 'categories',
    users: 'users'
  }

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const { url } = this.router;
        if(url.includes('movies')) this.currentUrl = 'movies'
        else if (url.includes('categories')) this.currentUrl = 'categories'
        else if (url.includes('users')) this.currentUrl = 'users'
      }
    });
  }
}
