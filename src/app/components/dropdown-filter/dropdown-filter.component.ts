import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../services/categoty/category.service';
import { Category } from '../../types/category';
import { __values } from 'tslib';

@Component({
  selector: 'app-dropdown-filter',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './dropdown-filter.component.html',
  styleUrl: './dropdown-filter.component.css'
})
export class DropdownFilterComponent {
  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef;
  @Input() categoryFilter: string[] = [];
  @Input() runingTime: string = '';
  @Output() changeCategory = new EventEmitter<string>();
  @Output() changeRunTime = new EventEmitter<string>();
  categoriesList:Category[] = [];
  error: string = '';
  constructor(
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }
  getAllCategory() {
    this.spinner.show();
    this.categoryService.getAll().subscribe((data: any) => {
      this.categoriesList = data
      this.spinner.hide();

    }, (error) => {
      this.spinner.hide();
      this.error = error.message
    })
  }

  isDropdownOpen:boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:mousedown', ['$event'])
  handleClickOutside(event: Event) {
    const isClickInsideContainer = this.dropdownContainer.nativeElement.contains(event.target);
    if (!isClickInsideContainer) {
      this.isDropdownOpen = false;
    }
  }

  onChange(e: any): void {
    if(e.target.name === 'genre') {
      this.changeCategory.emit(e.target.value);
    }
    else {
      this.changeRunTime.emit(e.target.value);
    }
  }
}
