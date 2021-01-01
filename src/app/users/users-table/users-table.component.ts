import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from '../../entity/user.interface';
import { MDBModalService, MdbTableDirective } from 'angular-bootstrap-md';
import { AreaEnum } from '../../entity/area.enum';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { UserState } from '../reducer/user.reducer';
import { getUsers } from '../selectors/user.selectors';
import { takeUntil } from 'rxjs/operators';
import {deleteUser, updateUser} from '../actions/user.actions';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, OnDestroy {
  @ViewChild(MdbTableDirective, { static: true }) userTable: MdbTableDirective;
  headElements = ['First Name', 'Last Name', 'Email', 'City', 'Edit', 'Delete'];
  users$: Observable<User[]>;
  searchFirstNameText = '';
  searchLastNameText = '';
  areas = [AreaEnum.All, AreaEnum.CENTRAL, AreaEnum.NORTH, AreaEnum.SOUTH];
  destroy$: Subject<void>;

  constructor(
    private store: Store<UserState>,
    private modalService: MDBModalService
  ) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<void>();
    this.users$ = this.store.pipe(select(getUsers));

    this.users$.pipe(takeUntil(this.destroy$)).subscribe((users) => {
      this.userTable.setDataSource(users);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onUserUpdate(user: User): void {
    this.store.dispatch(updateUser({update: user}));
  }

  deleteUser(id: string): void {
    this.store.dispatch(deleteUser({ id }));
  }

  search(): void {

  }
}
