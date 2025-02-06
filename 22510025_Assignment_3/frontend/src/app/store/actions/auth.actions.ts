import { createAction, props } from '@ngrx/store';
import { User } from '../types/auth.model';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const logout = createAction('[Auth] Logout');

