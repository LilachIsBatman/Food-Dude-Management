import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState, authStateToken} from '../reducer/auth.reducer';

const getAuthState = createFeatureSelector<AuthState>(authStateToken);
export const getToken = createSelector(getAuthState, (state) => state.token);
export const getUser = createSelector(getAuthState, (state) => state.user);
export const getErrorMassage = createSelector(
  getAuthState,
  (state) => state.error
);
export const isUserAdmin = createSelector(
  getUser,
  (user) => user?.role === 'admin'
);
export const getConnectedUsersAmount = createSelector(getAuthState, (state) => state.connectedUsersAmount);
