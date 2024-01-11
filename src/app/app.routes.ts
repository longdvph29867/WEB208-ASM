import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { EditComponent } from './pages/admin/movies/edit/edit.component';
import { DashboardComponent } from './pages/admin/movies/dashboard/dashboard.component';
import { CreateComponent } from './pages/admin/movies/create/create.component';

export const routes: Routes = [
  {
    'path': '', component: LayoutComponent,
    children: [
      {
        'path': '',
        component: HomeComponent,
      },
      {
        'path': 'movies/:id',
        component: DetailComponent
      },
    ]
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      {
        'path': 'movies',
        component: DashboardComponent
      },
      {
        'path': 'movies/create',
        component: CreateComponent
      },
      {
        'path': 'movies/edit/:id',
        component: EditComponent
      },
    ],
  },
];
