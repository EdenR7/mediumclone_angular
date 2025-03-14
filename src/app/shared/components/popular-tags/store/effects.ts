import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tagsActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { TagsService } from '../services/popularTags.service';
import { PopularTagInterface } from '../tags.interface';

export const getTagsEffect = createEffect(
  (
    // Injections
    actions$ = inject(Actions),
    tagsService = inject(TagsService)
  ) => {
    return actions$.pipe(
      ofType(tagsActions.getTags),
      switchMap(() => {
        return tagsService.getTags().pipe(
          map((tags: PopularTagInterface[]) => {
            return tagsActions.getTagsSuccess({ tags });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              tagsActions.getTagsFailure({
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
