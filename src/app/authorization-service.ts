import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserState } from './users/reducer/user.reducer';
import { getToken } from './login/selectors/auth.selectors';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationService {
  constructor(private store: Store<UserState>) {}

  public getToken$(): Observable<string> {
    return this.store.pipe(select(getToken)).pipe(
      filter((token) => token !== undefined),
      map((token) => `Bearer ${token}`)
    );
  }
}
