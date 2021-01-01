import {createAction, props} from '@ngrx/store';
import {Restaurant} from '../../entity/restaurant.interface';

export const loadRestaurants = createAction('[Restaurant] load restaurants');
export const loadRestaurantsSuccess = createAction(
  '[Restaurant] load restaurants success',
  props<{ restaurants: Restaurant[] }>()
);

export const updateRestaurant = createAction(
  '[Restaurants] update restaurant',
  props<{ update: Partial<Restaurant> }>()
);
export const updateRestaurantSuccess = createAction(
  '[Restaurants] update restaurant success',
  props<{ restaurant: Restaurant }>()
);

export const deleteRestaurant = createAction('[Restaurant] delete restaurant', props<{ id: string }>());
export const deleteRestaurantSuccess = createAction(
  '[Restaurant] delete restaurant success',
  props<{ restaurant: Restaurant }>()
);
