import { createAction, props } from '@ngrx/store';
import {
  AverageRatingStatistics,
  RestaurantShareStatistics,
} from '../reducers/statistics.reducer';

export enum StatisticsActionTypes {
  LOAD_AVERAGE_RATING = '[Statistics] Load average rating',
  LOAD_AVERAGE_RATING_SUCCESS = '[Statistics] Load average rating success',
  LOAD_AVERAGE_RATING_FAILED = '[Statistics] Load average rating failed',
  LOAD_RESTAURANT_SHARE = '[Statistics] Load restaurant share',
  LOAD_RESTAURANT_SHARE_SUCCESS = '[Statistics] Load restaurant share success',
  LOAD_RESTAURANT_SHARE_FAILED = '[Statistics] Load restaurant share failed',
}

export const loadAverageRating = createAction(
  StatisticsActionTypes.LOAD_AVERAGE_RATING
);
export const loadAverageRatingSuccess = createAction(
  StatisticsActionTypes.LOAD_AVERAGE_RATING_SUCCESS,
  props<{ data: AverageRatingStatistics }>()
);

export const loadRestaurantShare = createAction(
  StatisticsActionTypes.LOAD_RESTAURANT_SHARE
);
export const loadRestaurantShareSuccess = createAction(
  StatisticsActionTypes.LOAD_RESTAURANT_SHARE_SUCCESS,
  props<{ data: RestaurantShareStatistics }>()
);
