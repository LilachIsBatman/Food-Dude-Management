import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from './authorization-service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AuthState} from './login/reducer/auth.reducer';
import {getConnectedUsers} from './login/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private authorizationService: AuthorizationService,
              private store: Store<AuthState>) {
  }

  isInLogin(): boolean {
    return this.router.url.includes('login') ;
  }

  isUserLogin(): Observable<string> {
    return this.authorizationService.getToken$();
  }

  getConnectedUsersAmount(): Observable<number> {
    return this.store.pipe(select(getConnectedUsers));
  }
}
