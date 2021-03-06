import { createAction, props } from '@ngrx/store';
import {User} from '../../entity/user.interface';

export const login = createAction('[Auth] try login', props<{ email: string, password: string }>());
export const loginSuccess = createAction(
  '[Auth] login success',
  props<{ token: string }>()
);
export const loginFailed = createAction(
  '[Auth] login failed',
  props<{ error: string }>()
);
export const connectedUsers = createAction('[Auth] connectedUsers', props<{ users: User[] }>());

