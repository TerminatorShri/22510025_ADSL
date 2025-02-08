import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/auth.model';
import { login, logout } from '../actions/auth.actions';

export const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({ ...state, user })),
  on(logout, (state) => ({ ...state, user: null }))
);


