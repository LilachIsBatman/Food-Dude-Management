import {createReducer, on} from '@ngrx/store';
import {Restaurant} from '../../entity/restaurant.interface';
import {deleteRestaurantSuccess, loadRestaurantsSuccess, updateRestaurantSuccess} from '../actions/restaurant.action';

export interface RestaurantState {
  restaurants: Restaurant[];
}

export const restaurantStateToken = 'restaurants';

const initialState: RestaurantState = { restaurants: [] };

export const restaurantsReducer = createReducer(
  initialState,
  on(loadRestaurantsSuccess, (state, { restaurants }) => ({ ...state, restaurants })),
  on(updateRestaurantSuccess, (state, { restaurant }) => ({
    ...state,
    restaurants: state.restaurants.map((u) => (u._id === restaurant._id ? restaurant : u)),
  })),
  on(deleteRestaurantSuccess, (state, { restaurant }) => ({
    ...state,
    restaurants: state.restaurants.filter(currentRestaurant => currentRestaurant._id !== restaurant._id)
  }))
);
