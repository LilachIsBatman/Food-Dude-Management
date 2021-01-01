import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule, MDBModalRef, ModalModule} from 'angular-bootstrap-md';
import {UsersTableComponent} from './users/users-table/users-table.component';
import {UserEditorComponent} from './users/user-editor/user-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReviewsTableComponent} from './reviews/reviews-table/reviews-table.component';
import {StoreModule} from '@ngrx/store';
import {environment} from '../environments/environment';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {userReducer, userStateToken} from './users/reducer/user.reducer';
import {UserEffects} from './users/effects/user.effects.service';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {reviewReducer, reviewStateToken} from './reviews/reducer/review.reducer';
import {ReviewEffects} from './reviews/effects/review.effects.service';
import {RestaurantTableComponent} from './restaurants/restaurant-table/restaurant-table.component';
import {restaurantsReducer, restaurantStateToken} from './restaurants/reducer/restaurant.reducer';
import {RestaurantEffects} from './restaurants/effects/restaurant.effects.service';
import {RestaurantEditorComponent} from './restaurants/restaurant-editor/restaurant-editor.component';
import {categoriesReducer, categoryStateToken} from './categories/reducer/category.reducer';
import {CategoryEffects} from './categories/effects/category.effects.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    UserEditorComponent,
    ReviewsTableComponent,
    RestaurantTableComponent,
    RestaurantEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot({[userStateToken]: userReducer, [reviewStateToken]: reviewReducer,
      [restaurantStateToken]: restaurantsReducer, [categoryStateToken]: categoriesReducer}),
    EffectsModule.forRoot([UserEffects, ReviewEffects, RestaurantEffects, CategoryEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [UsersTableComponent, UserEffects, ReviewEffects, RestaurantEffects, CategoryEffects, MDBModalRef],
  bootstrap: [AppComponent],
})
export class AppModule {
}
