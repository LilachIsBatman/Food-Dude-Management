import { createAction, props } from '@ngrx/store';

export const login = createAction('[Login] try login', props<{ email: string, password: string }>());
export const loginSuccess = createAction(
  '[Login] login success',
  props<{ token: string }>()
);
export const loginFailed = createAction(
  '[Login] login failed',
  props<{ error: string }>()
);

