import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { register } from './actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
};

// The usage of createFeature allow us to not writing selectors, in contrast to createReducer method
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(register, (prevState) => ({ ...prevState, isSubmitting: true }))
  ),
});

export const { name: authFeatureKey, reducer: authReducer, selectIsSubmitting } = authFeature;
