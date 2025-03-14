import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BackendErrorsInterface } from '../../../types/backendErros.interface';
import { PopularTagInterface } from '../tags.interface';

export const tagsActions = createActionGroup({
  source: 'tags',
  events: {
    'Get Tags': emptyProps(),
    'Get Tags success': props<{ tags: PopularTagInterface[] }>(),
    'Get Tags failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
