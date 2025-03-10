import {createActionGroup, props} from '@ngrx/store'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import { CurrentUser } from '../../shared/types/currentUser.interface'
import { BackendErrorsInterface } from '../../shared/types/backendErros.interface'

// Create actionGroup instead 3 different objects
export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequestInterface}>(),
    'Register success': props<{currentUser: CurrentUser}>(),
    'Register failure': props<{errors: BackendErrorsInterface}>(),
  },
})

// export const register = createAction(
//   '[Auth] Register',
//   props<{ request: RegisterRequestInterface }>()
// );

// export const registerSuccess = createAction(
//   '[Auth] Register Success',
//   props<{ currentUser: CurrentUser }>()
// );

// export const registerFailure = createAction(
//   '[Auth] Register Failure',
//   props<{ error: string }>()
// );

