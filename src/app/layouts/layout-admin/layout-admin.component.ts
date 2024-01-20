import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { UserInfo } from '../../types/user';
import { LocalService } from '../../services/local.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterOutlet, AdminSidebarComponent, NgIf, RouterLink],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css'
})
export class LayoutAdminComponent {
  userInfo!: UserInfo | null;
  constructor(private localService: LocalService) {}
  ngOnInit(): void {
    this.userInfo = this.localService.get();
  }
  handleLogout() {
    this.localService.remove();
    location.href = '/'
  }
}
