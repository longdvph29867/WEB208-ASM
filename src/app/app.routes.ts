import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';

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
    ],
  },
];
