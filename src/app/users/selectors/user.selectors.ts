import { createFeatureSelector, createSelector } from '@ngrx/store';
import {UserState, userStateToken} from '../reducer/user.reducer';

const getUsersState = createFeatureSelector<UserState>(userStateToken);
export const getUsers = createSelector(getUsersState, (state) => state.users);
