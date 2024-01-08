import { Component } from '@angular/core';
import { TagsComponent } from './tags/tags.component';
import { CelebritiesListComponent } from './celebrities-list/celebrities-list.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CelebritiesListComponent, TagsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
