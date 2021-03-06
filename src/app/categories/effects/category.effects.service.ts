import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap, switchMapTo } from 'rxjs/operators';
import {
  createCategory,
  createCategorySuccess,
  deleteCategory,
  deleteCategorySuccess,
  loadCategories,
  loadCategoriesSuccess,
  updateCategory,
  updateCategorySuccess,
} from '../actions/category.action';
import { Category } from '../../entity/category.interface';
import { omit } from 'lodash';
import { AuthorizationService } from '../../authorization-service';
import { combineLatest } from 'rxjs';

@Injectable()
export class CategoryEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private http: HttpClient,
    private authorizationService: AuthorizationService
  ) {}

  loadCategories$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(loadCategories)),
    ]).pipe(
      switchMap(([token]) =>
        this.http.get<Category[]>(
          'https://food-dude.herokuapp.com/Categories',
          {
            headers: {
              Authorization: token,
            },
          }
        )
      ),
      map((categories) => loadCategoriesSuccess({ categories }))
    )
  );

  deleteCategory$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(deleteCategory)),
    ]).pipe(
      switchMap(([token, { id }]) =>
        this.http.delete(`https://food-dude.herokuapp.com/Categories/${id}`, {
          headers: {
            Authorization: token,
          },
        })
      ),
      map((category: Category) => deleteCategorySuccess({ category }))
    )
  );

  updateCategory$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(updateCategory)),
    ]).pipe(
      switchMap(([token, { update }]) =>
        this.http.put(
          `https://food-dude.herokuapp.com/Categories/${update._id}`,
          omit(update, ['_id']),
          {
            headers: {
              Authorization: token
            },
          }
        )
      ),
      map((category: Category) => updateCategorySuccess({ category }))
    )
  );

  createCategory$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(createCategory)),
    ]).pipe(
      switchMap(([token, { create }]) =>
        this.http.post(
          `https://food-dude.herokuapp.com/Categories`,
          omit(create, ['_id']),
          {
            headers: {
              Authorization: token
            },
          }
        )
      ),
      map((category: Category) => createCategorySuccess({ category }))
    )
  );

  ngrxOnInitEffects(): Action {
    return loadCategories();
  }
}
