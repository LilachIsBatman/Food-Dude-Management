import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../entity/user.interface';
import {MDBModalService, MdbTableDirective} from 'angular-bootstrap-md';
import {AreaEnum} from '../../entity/area.enum';
import {Observable, Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {UserState} from '../reducer/user.reducer';
import {getUsers} from '../selectors/user.selectors';
import {takeUntil} from 'rxjs/operators';
import {deleteUser, loadUsers, searchUsers, updateUser} from '../actions/user.actions';
import {isNil, omitBy} from 'lodash';
import {loadRestaurants} from '../../restaurants/actions/restaurant.action';

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
  areas = [AreaEnum.All, AreaEnum.CENTER, AreaEnum.NORTH, AreaEnum.SOUTH];
  destroy$: Subject<void>;
  isActiveUser = false;
  isContributor = false;
  selectedArea = AreaEnum.All;

  constructor(
    private store: Store<UserState>,
    private modalService: MDBModalService
  ) {
    this.store.dispatch(loadUsers());
  }

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
    this.store.dispatch(updateUser({ update: user }));
  }

  deleteUser(id: string): void {
    this.store.dispatch(deleteUser({ id }));
  }

  search(): void {
    this.store.dispatch(
      searchUsers({
        params: omitBy(
          {
            firstName: this.searchFirstNameText || undefined,
            lastName: this.searchLastNameText || undefined,
            area: this.getSearchableArea(),
            contributor: this.isContributor,
            currentlyLoggedIn: this.isActiveUser,
          },
          isNil
        ),
      })
    );
  }

  getSearchableArea(): AreaEnum {
    return this.selectedArea === AreaEnum.All ? undefined : this.selectedArea;
  }
}
