import { createAction, props } from '@ngrx/store';
import { AverageRatingStatistics } from '../reducers/statistics.reducer';

export enum StatisticsActionTypes {
  LOAD_AVERAGE_RATING = '[Statistics] Load average rating',
  LOAD_AVERAGE_RATING_SUCCESS = '[Statistics] Load average rating success',
  LOAD_AVERAGE_RATING_FAILED = '[Statistics] Load average rating failed',
}

export const loadAverageRating = createAction(
  StatisticsActionTypes.LOAD_AVERAGE_RATING
);
export const loadAverageRatingSuccess = createAction(
  StatisticsActionTypes.LOAD_AVERAGE_RATING_SUCCESS,
  props<{ data: AverageRatingStatistics }>()
);
