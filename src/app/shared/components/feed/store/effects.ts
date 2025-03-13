import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { feedActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FeedService } from '../services/feed.service';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';

// Register effects
export const registerEffect = createEffect(
  (
    // Injections
    actions$ = inject(Actions),
    feedService = inject(FeedService)
  ) => {
    console.log('registerEffect');
    return actions$.pipe(
      ofType(feedActions.getFeed),
      switchMap(({ url }) => {
        return feedService.getFeed(url).pipe(
          map((response: GetFeedResponseInterface) => {
            return feedActions.getFeedSuccess({ feed: response });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              feedActions.getFeedFailure({
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
