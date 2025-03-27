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

// DELETE EFFECTS
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

// CREATE EFFECTS
export const createArticleEffect = createEffect(
  (
    // Injections
    actions$ = inject(Actions),
    sharedArticleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(articleActions.createArticle),
      switchMap(({ request }) => {
        console.log(request);

        return sharedArticleService.createArticle(request).pipe(
          map((article) => {
            return articleActions.createArticleSuccess({ article });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log(errorResponse.error.errors);
            return of(
              articleActions.createArticleFailure({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);
export const redirectAfterCreateArticleEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(articleActions.createArticleSuccess),
      tap(({ article }) => {
        router.navigate(['/articles', article.slug]);
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
