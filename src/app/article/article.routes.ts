import { Route } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import * as ArticleEffects from './store/effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { articleFeatureKey, articleReducer } from './store/reducers';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import {
  createArticleFeatureKey,
  createArticleReducer,
} from './store/createArticleReducer';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import {
  editArticleFeatureKey,
  editArticleReducer,
} from './store/editArticleReducer';

export const routes: Route[] = [
  {
    path: 'new',
    component: CreateArticleComponent,
    providers: [
      provideState(createArticleFeatureKey, createArticleReducer),
      provideEffects(ArticleEffects),
    ],
  },
  {
    path: ':slug/edit',
    component: EditArticleComponent,
    providers: [
      provideEffects(ArticleEffects),
      provideState(editArticleFeatureKey, editArticleReducer),
      provideState(articleFeatureKey, articleReducer),
    ],
  },
  {
    path: ':slug',
    component: ArticleComponent,
    providers: [
      provideEffects(ArticleEffects),
      provideState(articleFeatureKey, articleReducer),
    ],
  },
];
