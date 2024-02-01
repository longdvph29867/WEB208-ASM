import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../types/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-admin',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, RouterLink],
  templateUrl: './search-admin.component.html',
  styleUrl: './search-admin.component.css'
})
export class SearchAdminComponent {
  @Input() key: string = '';
  @Input() listMovie: Movie[] = [];
  @Output() changeSearch = new EventEmitter<string>();
  @Output() submitSearch = new EventEmitter<string>();
  @ViewChild('listSearchContainer') listSearchContainer!: ElementRef;
  keyTimeout: any;
  isOpen: boolean = true;

  onInputFocus(): void {
    if(this.key) {
      this.isOpen = true
    }
  }
  onChangeSearch(): void {
    if (this.keyTimeout) {
      clearTimeout(this.keyTimeout);
    }
    if(!this.key) {
      return
    }
    this.keyTimeout = setTimeout(() => {
      this.changeSearch.emit(this.key);
      if (!this.key) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    }, 600);
  }

  @HostListener('document:mousedown', ['$event'])
  handleClickOutside(event: Event) {
    const isClickInsideContainer = this.listSearchContainer.nativeElement.contains(event.target);
    if (!isClickInsideContainer) {
      this.isOpen = false;
    }
  }


  handleSubmit() {
    this.submitSearch.emit(this.key)
    this.isOpen = false
  }
}
