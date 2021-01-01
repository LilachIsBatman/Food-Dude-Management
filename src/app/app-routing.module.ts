import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersTableComponent} from './users/users-table/users-table.component';
import {ReviewsTableComponent} from './reviews/reviews-table/reviews-table.component';
import {RestaurantTableComponent} from './restaurants/restaurant-table/restaurant-table.component';

const routes: Routes = [ { path: 'user-table', component: UsersTableComponent },
  { path: 'review-table', component: ReviewsTableComponent },
  { path: 'restaurant-table', component: RestaurantTableComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
