import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadAverageRating,
  loadAverageRatingSuccess,
  loadRestaurantShare,
  loadRestaurantShareSuccess,
} from '../actions/statistics.action';
import { exhaustMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { AuthorizationService } from '../../authorization-service';
import { HttpClient } from '@angular/common/http';
import {
  AverageRatingStatistics,
  RestaurantShareStatistics,
} from '../reducers/statistics.reducer';

@Injectable()
export class StatisticsEffect {
  loadAverageStatistics$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(loadAverageRating)),
    ]).pipe(
      exhaustMap(([token]) =>
        this.http
          .get(
            'http://food-dude.herokuapp.com/categories/statistics/category-average-rating',
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .pipe(
            map((data: AverageRatingStatistics[]) =>
              loadAverageRatingSuccess({ data })
            )
          )
      )
    )
  );

  loadRestaurantShareStatistics$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(loadRestaurantShare)),
    ]).pipe(
      exhaustMap(([token]) =>
        this.http
          .get(
            'http://food-dude.herokuapp.com/categories/statistics/category-restaurant-share',
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .pipe(
            map((data: RestaurantShareStatistics[]) =>
              loadRestaurantShareSuccess({ data })
            )
          )
      )
    )
  );

  constructor(
    private actions: Actions,
    private http: HttpClient,
    private authorizationService: AuthorizationService
  ) {}
}
