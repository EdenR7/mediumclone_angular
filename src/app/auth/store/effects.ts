import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { CurrentUser } from '../../shared/types/currentUser.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../shared/services/persistance.service';
import { Router } from '@angular/router';

export const registerEffect = createEffect(
  (
    // Injections
    actions$ = inject(Actions), // gets the actions as a stream
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    console.log('registerEffect');
    return actions$.pipe(
      ofType(authActions.register), // ensure its the register action
      switchMap(({ request }) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUser) => {
            persistanceService.set('accessToken', currentUser.token);
            return authActions.registerSuccess({ currentUser }); // dispatch the registerSuccess action
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              // dispatch the registerFailure action
              authActions.registerFailure({
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

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigate;
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
