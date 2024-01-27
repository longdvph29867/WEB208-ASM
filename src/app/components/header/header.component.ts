import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserInfo } from '../../types/user';
import { LocalService } from '../../services/local/local.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userInfo!: UserInfo | null;
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
  constructor(private localService: LocalService) {}
  ngOnInit(): void {
    this.userInfo = this.localService.get();
  }

  handleLogout() {
    this.localService.remove();
    location.href = '/'
  }
}
