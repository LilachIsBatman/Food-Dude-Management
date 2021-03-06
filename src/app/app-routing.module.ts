import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { ReviewsTableComponent } from './reviews/reviews-table/reviews-table.component';
import { RestaurantTableComponent } from './restaurants/restaurant-table/restaurant-table.component';
import { CategoriesTableComponent } from './categories/categories-table/categories-table.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './admin-guard.service';
import { AverageRatingComponent } from './statistics/average-rating/average-rating.component';
import { RestaurantShareComponent } from './statistics/restaurant-share/restaurant-share.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'users-table',
    component: UsersTableComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'review-table',
    component: ReviewsTableComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'restaurant-table',
    component: RestaurantTableComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'categories-table',
    component: CategoriesTableComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'statistics',
    children: [
      {
        path: 'restaurants-share',
        component: RestaurantShareComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'average-rating',
        component: AverageRatingComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
