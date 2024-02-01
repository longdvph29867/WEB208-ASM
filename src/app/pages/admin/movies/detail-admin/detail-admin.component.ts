import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../../types/movie';
import { MoviesService } from '../../../../services/movie/movies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-admin',
  standalone: true,
  imports: [],
  templateUrl: './detail-admin.component.html',
  styleUrl: './detail-admin.component.css'
})
export class DetailAdminComponent {
  movie:Partial<Movie> = {};
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private spinner: NgxSpinnerService,
    private location: Location,
    ) {}
  goBack() {
    this.location.back();
  }
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.getDetail(id);
      } else {
        return;
      }
    });

  }
  getDetail(id: string) {
    this.spinner.show();
    this.movieService.getDetail(id).subscribe((data: any) => {
    this.spinner.hide();
      this.movie = data
      console.log("🚀 ~ DetailAdminComponent ~ this.movieService.getDetail ~ data:", data)
    }, (error) => {
    this.spinner.hide();
      this.error = error.message
    })
  }
}
