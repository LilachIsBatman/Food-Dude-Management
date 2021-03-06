import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from './authorization-service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AuthState} from './login/reducer/auth.reducer';
import {getConnectedUsersAmount} from './login/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  token: Observable<string>;
  connectedUserAmount: Observable<number>;

  constructor(private router: Router, private authorizationService: AuthorizationService,
              private store: Store<AuthState>) {
    this.token = this.authorizationService.getToken$();
    this.connectedUserAmount = this.store.pipe(select(getConnectedUsersAmount));
  }

  isInLogin(): boolean {
    return this.router.url.includes('login') ;
  }
}
