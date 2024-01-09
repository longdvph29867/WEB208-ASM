import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  tagsList = [
    'Batman',
    'film',
    'homeland',
    'Fast & Furious',
    'Dead Walker',
    'King',
    'Beauty',
    'Fast & Furious',
    'Batman',
    'film',
    'homeland',
    'Fast & Furious',
    'Dead Walker',
    'King',
    'Beauty',
  ]
}
