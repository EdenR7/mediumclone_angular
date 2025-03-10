import { BackendErrorsInterface } from '../../shared/types/backendErros.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUserInterface | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
