import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { loadAverageRatingSuccess } from '../actions/statistics.action';

export const statisticsToken = 'statistics';

export type AverageRatingStatistics = Record<string, number>;
export type RestaurantShareStatistics = Record<
  string,
  { amount: number; percentage: number }
>;

export interface StatisticsState {
  averageRating: AverageRatingStatistics;
  restaurantShare: RestaurantShareStatistics;
}

export const statisticsInitialState: StatisticsState = {
  averageRating: {},
  restaurantShare: {},
};

export const statisticsReducer = createReducer(
  statisticsInitialState,
  on(loadAverageRatingSuccess, (state, { data }) => ({
    ...state,
    averageRating: data,
  }))
);

export const getStatisticsState = createFeatureSelector(statisticsToken);
export const getAverageStatistics = createSelector(
  getStatisticsState,
  (state: StatisticsState) => state.averageRating
);
