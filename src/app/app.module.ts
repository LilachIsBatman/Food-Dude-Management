import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MDBBootstrapModule, MDBModalRef, ModalModule} from 'angular-bootstrap-md';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { UserEditorComponent } from './users/user-editor/user-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewsTableComponent } from './reviews-table/reviews-table.component';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer, userStateToken } from './users/reducer/user.reducer';
import { UserEffects } from './users/effects/user.effects.service';
import { EffectsModule } from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {reviewReducer, reviewStateToken} from './users/reducer/review.reducer';
import {ReviewEffects} from './users/effects/review.effects.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    UserEditorComponent,
    ReviewsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot({ [userStateToken]: userReducer, [reviewStateToken]: reviewReducer }),
    EffectsModule.forRoot([UserEffects, ReviewEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [UsersTableComponent, UserEffects, ReviewEffects, MDBModalRef],
  bootstrap: [AppComponent],
})
export class AppModule {}
