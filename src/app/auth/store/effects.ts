import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { authActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../shared/services/persistance.service';
import { Router } from '@angular/router';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';

// Register effects
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

// Login effects
export const LoginEffect = createEffect(
  (
    // Injections
    actions$ = inject(Actions), // gets the actions as a stream
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    console.log('LoginEffect');
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

// Get user effects
export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    console.log('getCurrentUser');
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = persistanceService.get('accessToken');
        if (!token) {
          // If there isnt token so we shouldnt send the get user request
          return of(authActions.getCurrentUserFailure());
        }
        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.getCurrentUserSuccess({ currentUser });
          }),
          catchError(() => {
            return of(authActions.getCurrentUserFailure());
          })
        );
      })
    );
  },
  { functional: true }
);
