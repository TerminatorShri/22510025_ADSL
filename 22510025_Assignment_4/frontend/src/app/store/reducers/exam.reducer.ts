import { createReducer, on } from '@ngrx/store';
import { setExam, clearExam } from '../actions/exam.actions';
import { AppState } from '../types/app.state';

export const initialState: AppState = {
  exam: null,
};

export const examReducer = createReducer(
  initialState,
  on(setExam, (state, { exam }) => ({ ...state, exam })), // Ensure correct type
  on(clearExam, (state) => ({ ...state, exam: null })) // Explicitly return null
);
