import { createFeature, createReducer, on } from '@ngrx/store';
import { articleActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';
import { editArticleStateInterface } from '../components/edit-article/edit-article.types';

const editArticleState: editArticleStateInterface = {
  article: null,
  isLoading: false,
  isSubmiting: false,
  validationErrors: null,
};
const editArticleFeature = createFeature({
  name: 'editArticle',
  reducer: createReducer(
    editArticleState,
    on(articleActions.editArticle, (state) => ({
      ...state,
      isSubmiting: true,
    })),
    on(articleActions.editArticleSuccess, (state) => {
      return {
        ...state,
        isSubmiting: false,
      };
    }),
    on(articleActions.editArticleFailure, (state, action) => {
      return { ...state, isSubmiting: false, validationErrors: action.errors };
    }),
    // On event of routing we will make sure we clean the errors as it unneccessery anymore
    on(routerNavigationAction, () => editArticleState)
  ),
});

export const {
  name: editArticleFeatureKey,
  reducer: editArticleReducer,
  selectArticle,
  selectIsLoading,
  selectIsSubmiting,
  selectValidationErrors,
} = editArticleFeature;
