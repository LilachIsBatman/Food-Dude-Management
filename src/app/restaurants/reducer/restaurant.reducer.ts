import {createReducer, on} from '@ngrx/store';
import {Restaurant} from '../../entity/restaurant.interface';
import {
  createRestaurantSuccess,
  deleteRestaurantSuccess,
  loadRestaurantsSuccess,
  updateRestaurantBlockReviews,
  updateRestaurantSuccess
} from '../actions/restaurant.action';

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
  })),
  on(createRestaurantSuccess, (state, {restaurant}) => ({...state, restaurants: [...state.restaurants, restaurant]})),
  on(updateRestaurantBlockReviews, (state, { restaurantId, reviewsBlocked }) => ({
    ...state,
    restaurants: state.restaurants.map((restaurant) => (restaurant._id === restaurantId ? {...restaurant, reviewsBlocked} : restaurant)),
  }))
);
