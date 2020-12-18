import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersTableComponent} from './users-table/users-table.component';
import {ReviewsTableComponent} from './reviews-table/reviews-table.component';

const routes: Routes = [ { path: 'user-table', component: UsersTableComponent },
  { path: 'review-table', component: ReviewsTableComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
