import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MDBBootstrapModule, ModalModule} from 'angular-bootstrap-md';
import { UsersTableComponent } from './users-table/users-table.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReviewsTableComponent} from './reviews-table/reviews-table.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersTableComponent,
    UserEditorComponent,
    ReviewsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [UsersTableComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
