import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RestaurantState, restaurantStateToken} from '../reducer/restaurant.reducer';

const getRestaurantsState = createFeatureSelector<RestaurantState>(restaurantStateToken);
export const getRestaurants = createSelector(getRestaurantsState, (state) => state.restaurants);
