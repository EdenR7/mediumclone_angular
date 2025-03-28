import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { articleFormValuesInterface } from './article-form.types';
import { BackendErrorsInterface } from '../../types/backendErros.interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BackendErrorMessagesComponent } from '../backend-error-messages/backend-error-messages.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-form',
  imports: [BackendErrorMessagesComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss',
})
export class ArticleFormComponent implements OnInit {
  @Input() initialValues?: articleFormValuesInterface;
  @Input() isSubmitting: boolean = false;
  @Input() errors: BackendErrorsInterface | null = null;

  @Output() articleSubmit = new EventEmitter<articleFormValuesInterface>();

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    title: '',
    description: '',
    body: '',
    tagList: '',
  });

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    if (!this.initialValues) {
      throw new Error('Inputs hasnt been provided');
    }
    this.form.patchValue({
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' '),
    });
  }

  onSubmit(): void {
    const formValues = this.form.getRawValue();
    const articleFormValues = {
      ...formValues,
      tagList: formValues.tagList.split(' '),
    };
    this.articleSubmit.emit(articleFormValues);
  }
}
