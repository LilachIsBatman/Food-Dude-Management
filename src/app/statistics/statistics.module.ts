import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AverageRatingComponent } from './average-rating/average-rating.component';
import { RestaurantShareComponent } from './restaurant-share/restaurant-share.component';



@NgModule({
  declarations: [AverageRatingComponent, RestaurantShareComponent],
  imports: [
    CommonModule
  ]
})
export class StatisticsModule { }
