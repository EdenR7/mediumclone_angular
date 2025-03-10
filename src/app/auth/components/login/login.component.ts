import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';
import { combineLatest, Observable } from 'rxjs';
import { AuthStateInterface } from '../../types/authState.interface';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import {
  selectCurrentUser,
  selectIsLoading,
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { authActions } from '../../store/actions';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    BackendErrorMessagesComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;
  data$: Observable<AuthStateInterface>;
  constructor(private fb: FormBuilder, private store: Store) {
    this.data$ = combineLatest({
      isSubmitting: store.select(selectIsSubmitting),
      currentUser: store.select(selectCurrentUser),
      isLoading: store.select(selectIsLoading),
      validationErrors: store.select(selectValidationErrors),
    });
    this.form = this.fb!.nonNullable.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };
    // Trigger the action
    this.store.dispatch(authActions.login({ request }));
  }
}
