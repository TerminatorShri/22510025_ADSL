import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../types/auth.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);


