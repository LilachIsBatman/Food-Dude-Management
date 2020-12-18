import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {User} from './user.interface';
import {MDBModalService, MdbTableDirective} from 'angular-bootstrap-md';
import {AreaEnum} from '../entity/area.enum';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  @ViewChild(MdbTableDirective, {static: true}) userTable: MdbTableDirective;
  headElements = ['First Name', 'Last Name', 'Email', 'City', 'Edit', 'Delete'];
  users: User[] = [
    {firstName: 'Lilach', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}},
    {firstName: 'Lilach', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}},
    {firstName: 'Lilach', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}},
    {firstName: 'Batman', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}},
    {firstName: 'Lilach', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}},
    {firstName: 'Lilach', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}},
    {firstName: 'Lilach', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}},
    {firstName: 'Batman', lastName: 'Shimonov', email: 'lilach@gmail.com', location: {city: 'rishon', houseNumber: 3, street: 'hakokia'}}
  ];
  searchText = '';
  previous: string;
  areas = [AreaEnum.All, AreaEnum.CENTRAL, AreaEnum.NORTH, AreaEnum.SOUTH];

  constructor(private modalService: MDBModalService) {
  }

  @HostListener('input') oninput(): void {
    this.searchItems();
  }

  ngOnInit(): void {
    this.userTable.setDataSource(this.users);
    this.previous = this.userTable.getDataSource();
  }

  searchItems(): void {
    const previous = this.userTable.getDataSource();
    if (!this.searchText) {
      this.userTable.setDataSource(this.previous);
      this.users = this.userTable.getDataSource();
    }
    if (this.searchText) {
      this.users = this.userTable.searchLocalDataBy(this.searchText);
      this.userTable.setDataSource(previous);
    }
  }
}
