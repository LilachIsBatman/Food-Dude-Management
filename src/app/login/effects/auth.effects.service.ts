import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {login, loginFailed, loginSuccess} from '../actions/auth.action';
import {of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private http: HttpClient, private router: Router) {
  }

  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(login),
      switchMap(({email, password}) =>
        this.http.post(`https://food-dude.herokuapp.com/auth/login`, {
          email,
          password,
        }, {
          responseType: 'text'
        }).pipe(map((token: string) => loginSuccess({token})),
          catchError(errorMassage => of(loginFailed({error: errorMassage.error}))))
      ),
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions.pipe(
      ofType(loginSuccess),
      tap(() => this.router.navigate(['/users']))
    ), {
    dispatch: false
    }
  );
}
