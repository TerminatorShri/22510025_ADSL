import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/auth.model';
import { loginSuccess, logout } from '../actions/auth.actions';

const initialState: AuthState = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({ ...state, user })),
  on(logout, () => ({ user: null }))
);
