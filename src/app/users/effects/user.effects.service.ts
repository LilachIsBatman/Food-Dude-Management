import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import {
  deleteUser,
  deleteUserSuccess,
  loadUsers,
  loadUsersSuccess,
  searchUsers,
  updateUser,
  updateUserSuccess,
} from '../actions/user.actions';
import { Action, select, Store } from '@ngrx/store';
import { map, switchMap, switchMapTo } from 'rxjs/operators';
import { User } from '../../entity/user.interface';
import { omit } from 'lodash';
import { UserState } from '../reducer/user.reducer';
import { getErrorMassage } from '../../login/selectors/auth.selectors';
import { AuthorizationService } from '../../authorization-service';
import { combineLatest } from 'rxjs';
import {
  loadCategories,
  loadCategoriesSuccess,
} from '../../categories/actions/category.action';
import { Category } from '../../entity/category.interface';

@Injectable()
export class UserEffects implements OnInitEffects {
  constructor(
    private actions: Actions,
    private http: HttpClient,
    private authorizationService: AuthorizationService
  ) {}

  loadUsers$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(loadUsers)),
    ]).pipe(
      switchMap(([token]) =>
        this.http.get<User[]>('https://food-dude.herokuapp.com/users', {
          headers: {
            Authorization: token,
          },
        })
      ),
      map((users: User[]) => loadUsersSuccess({ users }))
    )
  );

  updateUser$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(updateUser)),
    ]).pipe(
      switchMap(([token, { update }]) =>
        this.http.put(
          `https://food-dude.herokuapp.com/users/${update._id}`,
          omit(update, ['_id', 'passwordHash', 'role']),
          {
            headers: {
              Authorization: token,
            },
          }
        )
      ),
      map((user: User) => updateUserSuccess({ user }))
    )
  );

  deleteUser$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(deleteUser)),
    ]).pipe(
      switchMap(([token, { id }]) =>
        this.http.delete(`https://food-dude.herokuapp.com/Users/${id}`, {
          headers: {
            Authorization: token,
          },
        })
      ),
      map((user: User) => deleteUserSuccess({ user }))
    )
  );

  searchUsers$ = createEffect(() =>
    combineLatest([
      this.authorizationService.getToken$(),
      this.actions.pipe(ofType(searchUsers)),
    ]).pipe(
      switchMap(([token, { params }]: [string, any]) =>
        this.http.get<User[]>('https://food-dude.herokuapp.com/users/search', {
          params,
          headers: {
            Authorization: token,
          },
        })
      ),
      map((users: User[]) => loadUsersSuccess({ users }))
    )
  );

  ngrxOnInitEffects(): Action {
    return loadUsers();
  }
}
