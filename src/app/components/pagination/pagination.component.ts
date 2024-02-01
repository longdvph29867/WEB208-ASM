import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() currentPage: number =1;
  @Input() pageActive: number = 1;
  @Input() limit: number = 10;
  @Output() changePage = new EventEmitter<number>();
  @Output() changeLimit = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage']) {
      this.updatePages();
    }
  }
  private updatePages() {
    this.pages = this.range(1, this.currentPage);
  }

  ngOnInit(): void {
    this.updatePages()
  }

  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map((el) => el + start);
  }

  onLimitChange() {
    this.changePage.emit(1)
    this.changeLimit.emit(Number(this.limit));
  }

  onPre() {
    if(this.pageActive === this.pages[0]) {
      return;
    }
    this.changePage.emit(this.pageActive - 1);
  }
  onNext() {
    if(this.pageActive === this.pages[this.currentPage-1]) {
      return;
    }
    this.changePage.emit(this.pageActive + 1);
  }
}
