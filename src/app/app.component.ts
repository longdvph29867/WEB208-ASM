import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Store, createFeatureSelector, createSelector } from '@ngrx/store';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { UserState } from './store/reducers/user.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  userInfo$?: Observable<any>;
  constructor(private store: Store) {
    // this.userInfo$ = this.store.select();
  }
  ngOnInit(): void {


  }
}
