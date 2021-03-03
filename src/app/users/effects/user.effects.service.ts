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
    this.actions.pipe(
      ofType(updateUser),
      switchMap(({ update }) =>
        this.http.put(
          `https://food-dude.herokuapp.com/users/${update._id}`,
          omit(update, ['_id', 'passwordHash', 'role']),
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ2ODBhODgzZWY0YzA2MzQ5NWFhNDMiLCJlbWFpbCI6InRvbUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJ0b20iLCJsYXN0TmFtZSI6InBvcmF0IiwiYWRkcmVzcyI6eyJhcmVhIjoiY2VudGVyIiwiY2l0eSI6IlRlbCBBdml2Iiwic3RyZWV0IjoiS2FwbGFuIiwiaG91c2VOdW1iZXIiOjF9LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MDg5OTA5NTZ9.rmP05WiEaqH80V6KXOaU2-YYIIHr5joX3MFbCreXtYA',
            },
          }
        )
      ),
      map((user: User) => updateUserSuccess({ user }))
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions.pipe(
      ofType(deleteUser),
      switchMap(({ id }) =>
        this.http.delete(`https://food-dude.herokuapp.com/Users/${id}`, {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ2ODBhODgzZWY0YzA2MzQ5NWFhNDMiLCJlbWFpbCI6InRvbUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJ0b20iLCJsYXN0TmFtZSI6InBvcmF0IiwiYWRkcmVzcyI6eyJhcmVhIjoiY2VudGVyIiwiY2l0eSI6IlRlbCBBdml2Iiwic3RyZWV0IjoiS2FwbGFuIiwiaG91c2VOdW1iZXIiOjF9LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MDg5OTA5NTZ9.rmP05WiEaqH80V6KXOaU2-YYIIHr5joX3MFbCreXtYA',
          },
        })
      ),
      map((user: User) => deleteUserSuccess({ user }))
    )
  );

  searchUsers$ = createEffect(() =>
    this.actions.pipe(
      ofType(searchUsers),
      switchMap(({ params }: { params: any }) =>
        this.http.get('https://food-dude.herokuapp.com/users/search', {
          params,
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmQ2ODBhODgzZWY0YzA2MzQ5NWFhNDMiLCJlbWFpbCI6InRvbUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJ0b20iLCJsYXN0TmFtZSI6InBvcmF0IiwiYWRkcmVzcyI6eyJhcmVhIjoiY2VudGVyIiwiY2l0eSI6IlRlbCBBdml2Iiwic3RyZWV0IjoiS2FwbGFuIiwiaG91c2VOdW1iZXIiOjF9LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MDg5OTA5NTZ9.rmP05WiEaqH80V6KXOaU2-YYIIHr5joX3MFbCreXtYA',
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
