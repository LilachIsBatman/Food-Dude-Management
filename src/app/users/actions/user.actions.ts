import {createAction, props} from '@ngrx/store';
import {User} from '../../entity/user.interface';

export const loadUsers = createAction('[Users] load users');
export const loadUsersSuccess = createAction(
  '[Users] load users success',
  props<{ users: User[] }>()
);

export const updateUser = createAction(
  '[Users] update user',
  props<{ update: Partial<User> }>()
);
export const updateUserSuccess = createAction(
  '[Users] update user success',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[User] delete user',
  props<{ id: string }>()
);
export const deleteUserSuccess = createAction(
  '[User] delete user success',
  props<{ user: User }>()
);

export const searchUsers = createAction(
  '[Users] search user',
  props<{
    params: Partial<Omit<Omit<User, '_id'>, 'address'> & {
      city: string;
      street: string;
      houseNumber: number;
    } & { contributor: boolean; currentlyLoggedIn: boolean }>;
  }>()
);
