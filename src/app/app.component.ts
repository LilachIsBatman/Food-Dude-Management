import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from './authorization-service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private authorizationService: AuthorizationService) {
  }

  isInLogin(): boolean {
    return this.router.url.includes('login') ;
  }

  isUserLogin(): Observable<string> {
    return this.authorizationService.getToken$();
  }
}
