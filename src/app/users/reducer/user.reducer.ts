import { User } from '../../entity/user.interface';
import { createReducer, on } from '@ngrx/store';
import {deleteUserSuccess, loadUsersSuccess, updateUserSuccess} from '../actions/user.actions';
import {deleteReviewSuccess} from '../../reviews/actions/review.action';

export interface UserState {
  users: User[];
}

export const userStateToken = 'users';

const initialState: UserState = { users: [] };

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u._id === user._id ? user : u)),
  })),
  on(deleteUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.filter(currentUsers => currentUsers._id !== user._id)
  }))
);
