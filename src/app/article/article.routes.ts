import { Route } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import * as ArticleEffects from './store/effects';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { articleFeatureKey, articleReducer } from './store/reducers';

export const routes: Route[] = [
  {
    path: '',
    component: ArticleComponent,
    providers: [
      provideEffects(ArticleEffects),
      provideState(articleFeatureKey, articleReducer),
    ],
  },
];
