import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { articleActions } from './actions';
import { ArticleStateInterface } from '../../shared/types/article.interface';

const initialState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  article: null,
};

const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,
    // GET ARTICLE
    on(articleActions.getArticle, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(articleActions.getArticleSuccess, (state, action) => {
      console.log(action.article);
      return {
        ...state,
        isLoading: false,
        article: action.article,
      };
    }),
    on(articleActions.getArticleFailure, (state, action) => ({
      ...state,
      isLoading: false,
      // error: action.errors,
    })),
    // On event of routing we will make sure we clean the errors as it unneccessery anymore
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: articleFeatureKey,
  reducer: articleReducer,
  selectArticleState,
  selectArticle,
  selectIsLoading,
  selectError,
} = articleFeature;
