import { createSelector } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';

// This selectors are not in use, because we have createdFeature method in reducers.ts

const selectFeature = (state: { auth: AuthStateInterface }) => state.auth;

export const isSubmittingSelector = createSelector(
  selectFeature,
  (state: AuthStateInterface) => state.isSubmitting
);
