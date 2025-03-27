import { createFeature, createReducer, on } from '@ngrx/store';
import { BackendErrorsInterface } from '../../shared/types/backendErros.interface';
import { articleActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

export interface createArticleState {
  isSubmiting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
const createArticleState: createArticleState = {
  isSubmiting: false,
  validationErrors: null,
};
const createArticleFeature = createFeature({
  name: 'createArticle',
  reducer: createReducer(
    createArticleState,
    on(articleActions.createArticle, (state) => ({
      ...state,
      isSubmiting: true,
    })),
    on(articleActions.createArticleSuccess, (state, action) => {
      console.log('Success reducer', action.article);

      return {
        ...state,
        isSubmiting: false,
      };
    }),
    on(articleActions.createArticleFailure, (state, action) => {
      console.log(action);

      console.log('Failure reducer', action.errors);

      return { ...state, isSubmiting: false, validationErrors: action.errors };
    }),
    // On event of routing we will make sure we clean the errors as it unneccessery anymore
    on(routerNavigationAction, () => createArticleState)
  ),
});

export const {
  name: createArticleFeatureKey,
  reducer: createArticleReducer,
  selectCreateArticleState,
  selectIsSubmiting,
  selectValidationErrors,
} = createArticleFeature;
