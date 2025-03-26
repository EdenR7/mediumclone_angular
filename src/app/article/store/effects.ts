import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleService as SharedArticleService } from '../../shared/services/article.service';
import { articleActions } from './actions';
import { ArticleInterface } from '../../shared/types/article.interface';

export const getArticleEffect = createEffect(
  (
    // Injections
    actions$ = inject(Actions),
    sharedArticleService = inject(SharedArticleService)
  ) => {
    console.log('getArticleEffect');
    return actions$.pipe(
      ofType(articleActions.getArticle),
      switchMap(({ slug }) => {
        return sharedArticleService.getArticle(slug).pipe(
          map((response: ArticleInterface) => {
            return articleActions.getArticleSuccess({ article: response });
          }),
          catchError(() => {
            return of(articleActions.getArticleFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
