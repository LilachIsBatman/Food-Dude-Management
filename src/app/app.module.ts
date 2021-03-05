import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule, MDBModalRef} from 'angular-bootstrap-md';
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
import {CommonModule} from '@angular/common';
import { CategoriesTableComponent } from './categories/categories-table/categories-table.component';
import { CategoriesEditorComponent } from './categories/categories-editor/categories-editor.component';
import { IndividualCategoryComponent } from './categories/individual-category/individual-category.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { IndividualRestaurantComponent } from './restaurants/individual-restaurant/individual-restaurant.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NewRestaurantComponent } from './restaurants/new-restaurant/new-restaurant.component';
import { LoginComponent } from './login/login.component';
import {AuthEffects} from './login/effects/auth.effects.service';
import {authReducer, authStateToken} from './login/reducer/auth.reducer';
import {AuthorizationService} from './authorization-service';
import {WebsocketService} from './login/websocket-service';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    UserEditorComponent,
    ReviewsTableComponent,
    RestaurantTableComponent,
    NewRestaurantComponent,
    RestaurantEditorComponent,
    CategoriesTableComponent,
    CategoriesEditorComponent,
    IndividualCategoryComponent,
    CreateCategoryComponent,
    IndividualRestaurantComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot({[userStateToken]: userReducer, [reviewStateToken]: reviewReducer,
      [restaurantStateToken]: restaurantsReducer, [categoryStateToken]: categoriesReducer, [authStateToken]: authReducer}, ),
    EffectsModule.forRoot([UserEffects, ReviewEffects, RestaurantEffects, CategoryEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule
  ],
  providers: [UsersTableComponent, UserEffects, ReviewEffects, RestaurantEffects, CategoryEffects, MDBModalRef,
    AuthEffects, AuthorizationService, WebsocketService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
