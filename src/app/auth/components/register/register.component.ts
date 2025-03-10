import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { combineLatest, Observable } from 'rxjs';
import {
  selectCurrentUser,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { authActions } from '../../store/actions';
import { BackendErrorsInterface } from '../../../shared/types/backendErros.interface';
import { AuthResponseInterface } from '../../types/authResponse.interface';
import { CurrentUser } from '../../../shared/types/currentUser.interface';
import { AuthStateInterface } from '../../types/authState.interface';
import { BackendErrorMessagesComponent } from "../../../shared/components/backend-error-messages/backend-error-messages.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink, BackendErrorMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  form: FormGroup;
  data$: Observable<AuthStateInterface>;
  // isSubmitting$!: Observable<boolean>;
  // backendErrors$!: Observable<BackendErrorsInterface | null>;
  constructor(private fb: FormBuilder, private store: Store) {
    // this.isSubmitting$ = this.store.select(selectIsSubmitting);
    // this.backendErrors$ = this.store.select(selectValidationErrors);

    // Instead of define new stream variable for all the selector we can use combine latest
    this.data$ = combineLatest({
      isSubmitting: this.store.select(selectIsSubmitting),
      validationErrors: this.store.select(selectValidationErrors),
      currentUser: this.store.select(selectCurrentUser),
      isLoading: this.store.select(selectIsLoading),
    });
    this.form = this.fb!.nonNullable.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
  }
}
