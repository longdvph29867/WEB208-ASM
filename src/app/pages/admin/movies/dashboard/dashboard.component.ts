import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Genre, Movie } from '../../../../types/movie';
import { MoviesService } from '../../../../services/movie/movies.service';
import { DescPipe } from '../../../../pipes/desc.pipe';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { ConfirmBoxComponent } from '../../../../components/confirm-box/confirm-box.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { DropdownFilterComponent } from '../../../../components/dropdown-filter/dropdown-filter.component';
import { SearchAdminComponent } from '../../../../components/search-admin/search-admin.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, DescPipe, PaginationComponent, DropdownFilterComponent, SearchAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  moviesList: Movie[] = [];
  moviesSearchChange: Movie[] = [];
  error: string = '';
  key: string = '';
  currentPage: number = 1;
  pageActive: number = 1
  limitActive: number = 10;;
  categoryFilter: string[] = [];
  runingTime: string = '';
  constructor(
    private movieService: MoviesService,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pageActive = Number(params['page']) ? Number(params['page']) : 1;
      this.limitActive = Number(params['limit']) ? Number(params['limit']) : 10;
      this.key = params['search'] ? params['search'] : '';
      this.categoryFilter = params['genre'] ? params['genre'].split(',') : [];
      this.runingTime = params['runningTime'] ? params['runningTime'] : '';

      this.getAllMovies();
    });

  }

  getAllMovies() {
    this.spinner.show();
    this.movieService.getAll(this.pageActive, this.limitActive, this.categoryFilter, this.key, this.runingTime).subscribe((data: any) => {
      this.moviesList = data.results.map((movie: Movie) => {
        const genre = (movie.genre as Genre[]).map((item: Genre) => item.categoryName).join(', ');
        return { ...movie, genre }
      })

      this.currentPage = data.totalPages
      this.limitActive = data.limit
      this.currentPage = data.totalPages
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.error = error.message
    })
  }

  delete(id: string) {
    this.movieService.delete(id).subscribe(res => {
      this.moviesList = this.moviesList.filter(item => item._id !== id);
      this.notification.success('Movie delete Successfull!', '')
    })
  }

  openConfirmBox(id: string) {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '300px',
      data: { title: 'Bạn có chắc chắn xoá không!', message: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id)
      } else {
      }
    });
  }

  changeURL(newPage: number, newLimit: number, categoryFilter: string[], key: string, runningTime: string) {
    const queryParams: any = { page: newPage, limit: newLimit, genre: categoryFilter.join(','), search: key, runningTime: runningTime };
    if (categoryFilter.length == 0) {
      queryParams.genre = null;
    }
    if (!key) {
      queryParams.search = null;
    }
    if (!runningTime) {
      queryParams.runningTime = null;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  changeLimit(quantity: number): void {
    this.limitActive = quantity;
    this.changeURL(this.pageActive, this.limitActive, this.categoryFilter, this.key, this.runingTime)
  }

  changePage(page: number): void {
    this.pageActive = page;
    this.changeURL(this.pageActive, this.limitActive, this.categoryFilter, this.key, this.runingTime)
  }

  changeRunTime(time: string): void {
    if(time === 'all_time') {
      this.runingTime=''
    }
    else {
      this.runingTime=time
    }
    this.pageActive = 1
    this.changeURL(this.pageActive, this.limitActive, this.categoryFilter, this.key, this.runingTime)
  }

  changeCategory(id: string): void {
    if (this.categoryFilter.includes(id)) {
      this.categoryFilter = this.categoryFilter.filter(item => item !== id);
    } else {
      this.categoryFilter.push(id);
    }
    this.pageActive = 1
    this.changeURL(this.pageActive, this.limitActive, this.categoryFilter, this.key, this.runingTime)
  }

  changeSearch(key: string): void {
    this.movieService.getSearch(key).subscribe((data: any) => {
      this.moviesSearchChange = data.results
    }, (error) => {
      this.error = error.message
    })
  }

  submitSearch(key: string): void {
    this.key = key
    this.categoryFilter = []
    this.runingTime = ''
    this.pageActive = 1
    this.changeURL(this.pageActive, this.limitActive, this.categoryFilter, this.key, this.runingTime)
  }
}
