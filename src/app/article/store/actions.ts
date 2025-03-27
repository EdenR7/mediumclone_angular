import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ArticleInterface } from '../../shared/types/article.interface';

export const articleActions = createActionGroup({
  source: 'article',
  events: {
    'Get Article': props<{ slug: string }>(),
    'Get Article success': props<{ article: ArticleInterface }>(),
    'Get Article failure': emptyProps(),

    'Delete Article': props<{ slug: string }>(),
    'Delete Article success': emptyProps(),
    'Delete Article failure': emptyProps(),
  },
});
