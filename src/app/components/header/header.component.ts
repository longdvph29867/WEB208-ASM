import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menus = [
    {
      name: 'HOME',
      link: '/'
    },
    {
      name: 'MOVIES',
      link: '/movies'
    },
    {
      name: 'CELEBRITIES',
      link: '/celebrities'
    },
    {
      name: 'COMMUNITY',
      link: '/community'
    }
  ]
}
