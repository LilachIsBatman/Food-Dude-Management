import {Component, OnInit} from '@angular/core';
import {User} from './user.interface';
import {UserEditorComponent} from '../user-editor/user-editor.component';
import {MDBModalService} from 'angular-bootstrap-md';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  headElements = ['First Name', 'Last Name', 'Email', 'City', 'Edit', 'Delete'];
  users: User[] = [
    {firstName: 'Lilach', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}},
    {firstName: 'Lilach', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}},
    {firstName: 'Lilach', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}},
    {firstName: 'Lilach', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}},
    {firstName: 'Lilach', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}}
  ];

  constructor(private modalService: MDBModalService) {
  }

  ngOnInit(): void {
  }
}
