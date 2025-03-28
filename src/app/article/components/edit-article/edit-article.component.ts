import { Component, inject, OnInit } from '@angular/core';
import { ArticleFormComponent } from '../../../shared/components/article-form/article-form.component';
import { CommonModule } from '@angular/common';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { articleFormValuesInterface } from '../../../shared/components/article-form/article-form.types';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ActivatedRoute } from '@angular/router';
import { selectArticle } from '../../store/reducers';
import {
  ArticleInterface,
  createArticleReqInterface,
} from '../../../shared/types/article.interface';
import {
  selectIsLoading,
  selectIsSubmiting,
  selectValidationErrors,
} from '../../store/editArticleReducer';
import { articleActions } from '../../store/actions';

@Component({
  selector: 'app-edit-article',
  imports: [ArticleFormComponent, CommonModule, LoadingComponent],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss',
})
export class EditArticleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);

  slug = this.route.snapshot.paramMap.get('slug') ?? '';
  initialValues$: Observable<articleFormValuesInterface> = this.store.pipe(
    select(selectArticle),
    filter((article): article is ArticleInterface => article !== null),
    map((article: ArticleInterface) => {
      console.log('Edit article :', article);
      return {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      };
    })
  );
  data$ = combineLatest({
    isSubmmiting: this.store.select(selectIsSubmiting),
    validationErrors: this.store.select(selectValidationErrors),
    isLoading: this.store.select(selectIsLoading),
    initialValues: this.initialValues$,
  });

  ngOnInit(): void {
    this.store.dispatch(articleActions.getArticle({ slug: this.slug }));
  }

  onSubmit(articleForm: articleFormValuesInterface): void {
    // console.log(articleForm);
    const createArticleReq: createArticleReqInterface = {
      article: articleForm,
    };
    this.store.dispatch(
      articleActions.editArticle({ request: createArticleReq, slug: this.slug })
    );
  }
}
