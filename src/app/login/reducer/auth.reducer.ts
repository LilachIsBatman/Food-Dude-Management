import { createReducer, on } from '@ngrx/store';
import { loginFailed, loginSuccess } from '../actions/auth.action';
import { User } from '../../entity/user.interface';
import jwt_decode from 'jwt-decode';

export interface AuthState {
  token?: string;
  user?: User;
  error?: string;
}

export const authStateToken = 'auth';

const initialState: AuthState = {
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
  }))
);
