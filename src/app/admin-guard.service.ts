import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthorizationService} from './authorization-service';
import {select, Store} from '@ngrx/store';
import {AuthState} from './login/reducer/auth.reducer';
import {combineLatest, Observable} from 'rxjs';
import {isUserAdmin} from './login/selectors/auth.selectors';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService, private store: Store<AuthState>) {
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest([
      this.authorizationService.getToken$(),
      this.store.pipe(select(isUserAdmin)),
    ]).pipe(
      map(([token, isAdmin]: [string, boolean]) => {
        return token.length !== 0 && isAdmin;
    }));
  }
}
