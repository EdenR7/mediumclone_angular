import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ArticleService as SharedArticleService } from '../article.service';
import { articleActions } from './actions';
import { ArticleInterface } from '../../shared/types/article.interface';
import { Router } from '@angular/router';

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

export const deleteArticleEffect = createEffect(
  (
    // Injections
    actions$ = inject(Actions),
    sharedArticleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticle),
      switchMap(({ slug }) => {
        return sharedArticleService.deleteArticle(slug).pipe(
          map(() => {
            return articleActions.deleteArticleSuccess();
          }),
          catchError(() => {
            return of(articleActions.deleteArticleFailure());
          })
        );
      })
    );
  },
  { functional: true }
);

export const redirectAfterDeleteArticleEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(articleActions.deleteArticleSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
