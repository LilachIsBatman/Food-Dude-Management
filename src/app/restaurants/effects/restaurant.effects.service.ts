import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  createRestaurant,
  createRestaurantSuccess,
  deleteRestaurant,
  deleteRestaurantSuccess,
  loadRestaurants,
  loadRestaurantsSuccess,
  searchRestaurants,
  updateRestaurant,
  updateRestaurantBlockReviews,
  updateRestaurantSuccess,
} from '../actions/restaurant.action';
import { Restaurant } from '../../entity/restaurant.interface';
import { omit } from 'lodash';
import { combineLatest } from 'rxjs';
import { AuthorizationService } from '../../authorization-service';
import { ToastrService } from 'ngx-toastr';
import { getRestaurants } from '../selectors/review.selectors';

@Injectable()
export class RestaurantEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private http: HttpClient,
    private authorizationService: AuthorizationService,
    private toastrService: ToastrService,
    private store: Store<Restaurant>
  ) {}

  loadRestaurants$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(loadRestaurants)),
    ]).pipe(
      switchMap(([token]) =>
        this.http.get('https://food-dude.herokuapp.com/restaurants', {
          headers: {
            Authorization: token,
          },
        })
      ),
      map((restaurants: Restaurant[]) =>
        loadRestaurantsSuccess({ restaurants })
      )
    )
  );

  updateRestaurant$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(updateRestaurant)),
    ]).pipe(
      switchMap(([token, { update }]) =>
        this.http.put(
          `https://food-dude.herokuapp.com/restaurants/${update._id}`,
          omit({ ...update, category: update.category._id }, [
            '_id',
            'reviewsBlocked',
          ]),
          {
            headers: {
              Authorization: token,
            },
          }
        )
      ),
      map((restaurant: Restaurant) => updateRestaurantSuccess({ restaurant }))
    )
  );

  deleteRestaurant$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(deleteRestaurant)),
    ]).pipe(
      switchMap(([token, { id }]) =>
        this.http.delete(`https://food-dude.herokuapp.com/Restaurants/${id}`, {
          headers: {
            Authorization: token,
          },
        })
      ),
      map((restaurant: Restaurant) => deleteRestaurantSuccess({ restaurant }))
    )
  );

  searchRestaurants$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(searchRestaurants)),
    ]).pipe(
      switchMap(([token, { params }]: [string, any]) =>
        this.http.get('https://food-dude.herokuapp.com/restaurants/search', {
          params,
          headers: {
            Authorization: token,
          },
        })
      ),
      map((restaurants: Restaurant[]) =>
        loadRestaurantsSuccess({ restaurants })
      )
    )
  );

  createRestaurant$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(createRestaurant)),
    ]).pipe(
      switchMap(([token, { create }]) =>
        this.http.post(
          `https://food-dude.herokuapp.com/Restaurants`,
          omit({ ...create, category: create.category._id }, [
            '_id',
            'reviewsBlocked',
            'reviews',
          ]),
          {
            headers: {
              Authorization: token,
            },
          }
        )
      ),
      map((restaurant: Restaurant) => createRestaurantSuccess({ restaurant }))
    )
  );

  blockRestaurantSuccess$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(updateRestaurantBlockReviews),
        withLatestFrom(this.store.pipe(select(getRestaurants))),
        map(([{ restaurantId }, restaurants]) =>
          restaurants.find((current) => current._id === restaurantId)
        ),
        tap(restaurant => {
          this.toastrService.success('reviews are ' +
            (restaurant.reviewsBlocked ? 'blocked' : 'allow') + ' for ' + restaurant.name);
        })
      ),
    { dispatch: false }
  );

  ngrxOnInitEffects(): Action {
    return loadRestaurants();
  }
}
