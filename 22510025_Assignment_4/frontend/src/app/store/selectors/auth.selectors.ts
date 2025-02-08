import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../types/app.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
