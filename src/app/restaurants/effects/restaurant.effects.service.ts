import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {map, switchMap, switchMapTo} from 'rxjs/operators';
import {
  createRestaurant, createRestaurantSuccess,
  deleteRestaurant,
  deleteRestaurantSuccess,
  loadRestaurants,
  loadRestaurantsSuccess, searchRestaurants,
  updateRestaurant,
  updateRestaurantSuccess,
} from '../actions/restaurant.action';
import {Restaurant} from '../../entity/restaurant.interface';
import {omit} from 'lodash';

@Injectable()
export class RestaurantEffects implements OnInitEffects {
  constructor(private actions: Actions, private http: HttpClient) {
  }

  loadRestaurants$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadRestaurants),
      switchMapTo(
        this.http.get('https://food-dude.herokuapp.com/restaurants', {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ2ODBhODgzZWY0YzA2MzQ5NWFhNDMiLCJlbWFpbCI6InRvbUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJ0b20iLCJsYXN0TmFtZSI6InBvcmF0IiwiYWRkcmVzcyI6eyJhcmVhIjoiY2VudGVyIiwiY2l0eSI6IlRlbCBBdml2Iiwic3RyZWV0IjoiS2FwbGFuIiwiaG91c2VOdW1iZXIiOjF9LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MDg5OTA5NTZ9.rmP05WiEaqH80V6KXOaU2-YYIIHr5joX3MFbCreXtYA',
          },
        })
      ),
      map((restaurants: Restaurant[]) =>
        loadRestaurantsSuccess({restaurants})
      )
    )
  );

  updateRestaurant$ = createEffect(() =>
    this.actions.pipe(
      ofType(updateRestaurant),
      switchMap(({update}) =>
        this.http.put(
          `https://food-dude.herokuapp.com/restaurants/${update._id}`,
          omit({...update, category: update.category._id}, ['_id', 'reviewsBlocked']),
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ2ODBhODgzZWY0YzA2MzQ5NWFhNDMiLCJlbWFpbCI6InRvbUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJ0b20iLCJsYXN0TmFtZSI6InBvcmF0IiwiYWRkcmVzcyI6eyJhcmVhIjoiY2VudGVyIiwiY2l0eSI6IlRlbCBBdml2Iiwic3RyZWV0IjoiS2FwbGFuIiwiaG91c2VOdW1iZXIiOjF9LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MDg5OTA5NTZ9.rmP05WiEaqH80V6KXOaU2-YYIIHr5joX3MFbCreXtYA',
            },
          }
        )
      ),
      map((restaurant: Restaurant) => updateRestaurantSuccess({restaurant}))
    )
  );

  deleteRestaurant$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteRestaurant),
      switchMap(({id}) =>
        this.http.delete(
          `https://food-dude.herokuapp.com/Restaurants/${id}`,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ2ODBhODgzZWY0YzA2MzQ5NWFhNDMiLCJlbWFpbCI6InRvbUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJ0b20iLCJsYXN0TmFtZSI6InBvcmF0IiwiYWRkcmVzcyI6eyJhcmVhIjoiY2VudGVyIiwiY2l0eSI6IlRlbCBBdml2Iiwic3RyZWV0IjoiS2FwbGFuIiwiaG91c2VOdW1iZXIiOjF9LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MDg5OTA5NTZ9.rmP05WiEaqH80V6KXOaU2-YYIIHr5joX3MFbCreXtYA',
            },
          }
        )
      ),
      map((restaurant: Restaurant) => deleteRestaurantSuccess({restaurant}))
    )
  );

  searchRestaurants$ = createEffect(() =>
    this.actions.pipe(
      ofType(searchRestaurants),
      switchMap(({params}: { params: any }) =>
        this.http.get('https://food-dude.herokuapp.com/restaurants/search', {
          params,
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ2ODBhODgzZWY0YzA2MzQ5NWFhNDMiLCJlbWFpbCI6InRvbUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJ0b20iLCJsYXN0TmFtZSI6InBvcmF0IiwiYWRkcmVzcyI6eyJhcmVhIjoiY2VudGVyIiwiY2l0eSI6IlRlbCBBdml2Iiwic3RyZWV0IjoiS2FwbGFuIiwiaG91c2VOdW1iZXIiOjF9LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MDg5OTA5NTZ9.rmP05WiEaqH80V6KXOaU2-YYIIHr5joX3MFbCreXtYA',
          },
        })
      ),
      map((restaurants: Restaurant[]) => loadRestaurantsSuccess({restaurants}))
    )
  );

  createRestaurant$ = createEffect(() =>
    this.actions.pipe(
      ofType(createRestaurant),
      switchMap(({ create }) =>
        this.http.post(
          `https://food-dude.herokuapp.com/Restaurants`,
          omit({...create, category: create.category._id}, ['_id', 'reviewsBlocked', 'reviews']),
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ2ODBhODgzZWY0YzA2MzQ5NWFhNDMiLCJlbWFpbCI6InRvbUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJ0b20iLCJsYXN0TmFtZSI6InBvcmF0IiwiYWRkcmVzcyI6eyJhcmVhIjoiY2VudGVyIiwiY2l0eSI6IlRlbCBBdml2Iiwic3RyZWV0IjoiS2FwbGFuIiwiaG91c2VOdW1iZXIiOjF9LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MDg5OTA5NTZ9.rmP05WiEaqH80V6KXOaU2-YYIIHr5joX3MFbCreXtYA',
            },
          }
        )
      ),
      map((restaurant: Restaurant) => createRestaurantSuccess({ restaurant }))
    )
  );

  ngrxOnInitEffects(): Action {
    return loadRestaurants();
  }
}
