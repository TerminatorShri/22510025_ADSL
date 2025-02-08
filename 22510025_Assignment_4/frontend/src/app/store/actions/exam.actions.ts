import { createAction, props } from '@ngrx/store';
import { Exam } from '../types/exam.model';

// Set Exam Info when navigating to exam dashboard
export const setExam = createAction('[Exam] Set Exam', props<{ exam: Exam }>());

// Clear Exam Info when leaving the dashboard
export const clearExam = createAction('[Exam] Clear Exam');
