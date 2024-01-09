import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-celebrities-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './celebrities-list.component.html',
  styleUrl: './celebrities-list.component.css'
})
export class CelebritiesListComponent {
  celebritiesList = [
    {
      name: 'Benjamin Carroll',
      img: '../../../assets/img/actor.jpeg'
    },
    {
      name: 'Samuel N. Jack',
      img: '../../../assets/img/actor2.jpeg'
    },
    {
      name: 'Beverly Griffin',
      img: '../../../assets/img/actor3.jpeg'
    },
    {
      name: 'Justin Weaver',
      img: '../../../assets/img/actor4.jpeg'
    }
  ]
}
