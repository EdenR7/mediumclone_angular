import { Component, inject } from '@angular/core';
import { articleFormValuesInterface } from '../../../shared/components/article-form/article-form.types';
import { ArticleFormComponent } from '../../../shared/components/article-form/article-form.component';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectIsSubmiting,
  selectValidationErrors,
} from '../../store/createArticleReducer';
import { createArticleReqInterface } from '../../../shared/types/article.interface';
import { articleActions } from '../../store/actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-article',
  imports: [ArticleFormComponent, CommonModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss',
})
export class CreateArticleComponent {
  initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  private store = inject(Store);
  data$ = combineLatest({
    isSubmmiting: this.store.select(selectIsSubmiting),
    validationErrors: this.store.select(selectValidationErrors),
  });

  onSubmit(articleForm: articleFormValuesInterface): void {
    const createArticleReq: createArticleReqInterface = {
      article: articleForm,
    };
    this.store.dispatch(
      articleActions.createArticle({ request: createArticleReq })
    );
  }
}
