import { createReducer, on } from '@ngrx/store';
import {connectedUsers, loginFailed, loginSuccess} from '../actions/auth.action';
import { User } from '../../entity/user.interface';
import jwt_decode from 'jwt-decode';

export interface AuthState {
  connectedUsersAmount: number;
  token?: string;
  user?: User;
  error?: string;
}

export const authStateToken = 'auth';

const initialState: AuthState = {
  connectedUsersAmount: 0,
  token: undefined,
  user: undefined,
  error: undefined,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token }) => ({
    ...state,
    token,
    user: jwt_decode(token) as User,
    error: undefined,
  })),
  on(loginFailed, (state, { error }) => ({
    ...state,
    error,
    token: undefined,
    user: undefined,
  })),
  on(connectedUsers, (state, {users}) => ({
    ...state,
    connectedUsersAmount: users.length,
  }))
);
