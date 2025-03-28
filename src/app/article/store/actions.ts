import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  ArticleInterface,
  createArticleReqInterface,
} from '../../shared/types/article.interface';
import { BackendErrorsInterface } from '../../shared/types/backendErros.interface';

export const articleActions = createActionGroup({
  source: 'article',
  events: {
    'Get Article': props<{ slug: string }>(),
    'Get Article success': props<{ article: ArticleInterface }>(),
    'Get Article failure': emptyProps(),

    'Delete Article': props<{ slug: string }>(),
    'Delete Article success': emptyProps(),
    'Delete Article failure': emptyProps(),

    'Create Article': props<{ request: createArticleReqInterface }>(),
    'Create Article success': props<{ article: ArticleInterface }>(),
    'Create Article failure': props<{ errors: BackendErrorsInterface }>(),

    'Edit Article': props<{
      request: createArticleReqInterface;
      slug: string;
    }>(),
    'Edit Article success': props<{ article: ArticleInterface }>(),
    'Edit Article failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
