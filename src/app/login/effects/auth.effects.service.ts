import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {login, loginFailed, loginSuccess} from '../actions/auth.action';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {WebsocketService} from '../websocket-service';

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions, private http: HttpClient, private router: Router,
              private webSocketService: WebsocketService ) {
  }

  login$ = createEffect(() =>
    this.actions.pipe(
      ofType(login),
      switchMap(({email, password}) =>
        this.http.post(`https://food-dude.herokuapp.com/auth/login?onlyAdmin=true`, {
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
      tap(({token}) => {
        this.router.navigate(['/users-table']);
        this.webSocketService.openWebsocket(token);
      })
    ), {
    dispatch: false
    }
  );
}
