import { BackendErrorsInterface } from '../../shared/types/backendErros.interface';
import { CurrentUser } from '../../shared/types/currentUser.interface';

export interface AuthStateInterface {
  isSubmitting: boolean;
  currentUser: CurrentUser | null | undefined;
  isLoading: boolean;
  validationErrors: BackendErrorsInterface | null;
}
