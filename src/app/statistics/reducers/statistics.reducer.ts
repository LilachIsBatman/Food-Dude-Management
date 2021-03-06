import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  loadAverageRatingSuccess,
  loadRestaurantShareSuccess,
} from '../actions/statistics.action';

export const statisticsToken = 'statistics';

export interface AverageRatingStatistics {
  id: string;
  name: string;
  averageRating: number;
}
export interface RestaurantShareStatistics {
  name: string;
  amount: number;
  percentage: number;
  id: string;
}

export interface StatisticsState {
  averageRating: AverageRatingStatistics[];
  restaurantShare: RestaurantShareStatistics[];
}

export const statisticsInitialState: StatisticsState = {
  averageRating: [],
  restaurantShare: [],
};

export const statisticsReducer = createReducer(
  statisticsInitialState,
  on(loadAverageRatingSuccess, (state, { data }) => ({
    ...state,
    averageRating: data,
  })),
  on(loadRestaurantShareSuccess, (state, { data }) => ({
    ...state,
    restaurantShare: data,
  }))
);

export const getStatisticsState = createFeatureSelector(statisticsToken);
export const getAverageStatistics = createSelector(
  getStatisticsState,
  (state: StatisticsState) => state.averageRating
);
export const getRestaurantShareStatistics = createSelector(
  getStatisticsState,
  (state: StatisticsState) => state.restaurantShare
);
