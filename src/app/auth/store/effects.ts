import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../shared/services/persistance.service';
import { Router } from '@angular/router';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';

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
          map((currentUser: CurrentUserInterface) => {
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
        router.navigateByUrl('/');
      })
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const LoginEffect = createEffect(
  (
    // Injections
    actions$ = inject(Actions), // gets the actions as a stream
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    console.log('registerEffect');
    return actions$.pipe(
      ofType(authActions.login), // ensure its the register action
      switchMap(({ request }) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token);
            return authActions.loginSuccess({ currentUser }); // dispatch the registerSuccess action
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              // dispatch the registerFailure action
              authActions.loginFailure({
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

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
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
