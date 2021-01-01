import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {map, switchMap, switchMapTo} from 'rxjs/operators';
import {
  loadCategories, loadCategoriesSuccess
} from '../actions/category.action';
import {Category} from '../../entity/category.interface';

@Injectable()
export class CategoryEffects implements OnInitEffects {
  constructor(private actions: Actions, private http: HttpClient) {}

  loadCategories$ = createEffect(() =>
    this.actions.pipe(
      ofType(loadCategories),
      switchMapTo(
        this.http.get('https://food-dude.herokuapp.com/Categories', {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ2ODBhODgzZWY0YzA2MzQ5NWFhNDMiLCJlbWFpbCI6InRvbUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJ0b20iLCJsYXN0TmFtZSI6InBvcmF0IiwiYWRkcmVzcyI6eyJhcmVhIjoiY2VudGVyIiwiY2l0eSI6IlRlbCBBdml2Iiwic3RyZWV0IjoiS2FwbGFuIiwiaG91c2VOdW1iZXIiOjF9LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MDg5OTA5NTZ9.rmP05WiEaqH80V6KXOaU2-YYIIHr5joX3MFbCreXtYA',
          },
        })
      ),
      map((categories: Category[]) => loadCategoriesSuccess({ categories }))
    )
  );

  ngrxOnInitEffects(): Action {
    return loadCategories();
  }
}
