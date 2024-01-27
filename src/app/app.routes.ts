import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { LayoutAdminComponent } from './layouts/layout-admin/layout-admin.component';
import { EditComponent } from './pages/admin/movies/edit/edit.component';
import { DashboardComponent } from './pages/admin/movies/dashboard/dashboard.component';
import { CreateComponent } from './pages/admin/movies/create/create.component';
import { ListCategoriesComponent } from './pages/admin/category/list-categories/list-categories.component';
import { CreateCategoryComponent } from './pages/admin/category/create-category/create-category.component';
import { EditCategoryComponent } from './pages/admin/category/edit-category/edit-category.component';
import { LayoutAuthComponent } from './layouts/layout-auth/layout-auth.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { authGuard } from './guard/auth.guard';
import { ListUsersComponent } from './pages/admin/user/list-users/list-users.component';
import { CreateUserComponent } from './pages/admin/user/create-user/create-user.component';
import { EditUserComponent } from './pages/admin/user/edit-user/edit-user.component';
import { ConfirmBoxComponent } from './components/confirm-box/confirm-box.component';

export const routes: Routes = [
  {
    'path': 'confirm',
    component: ConfirmBoxComponent
  },
  {
    'path': 'auth', component: LayoutAuthComponent,
    children: [
      {
        'path': 'login',
        component: LoginComponent,
      },
      {
        'path': 'register',
        component: RegisterComponent,
      },
    ]
  },
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
    canActivate:[authGuard],
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
      {
        'path': 'categories',
        component: ListCategoriesComponent
      },
      {
        'path': 'categories/create',
        component: CreateCategoryComponent
      },
      {
        'path': 'categories/edit/:slug',
        component: EditCategoryComponent
      },
      {
        'path': 'users',
        component: ListUsersComponent
      },
      {
        'path': 'users/create',
        component: CreateUserComponent
      },
      {
        'path': 'users/edit/:id',
        component: EditUserComponent
      },
    ],
  },
];
