import { createActionGroup, props } from '@ngrx/store';
import { BackendErrorsInterface } from '../../../types/backendErros.interface';
import { GetFeedResponseInterface } from '../types/getFeedResponse.interface';

export const feedActions = createActionGroup({
  source: 'feed',
  events: {
    'Get Feed': props<{ url: string }>(),
    'Get Feed success': props<{ feed: GetFeedResponseInterface }>(),
    'Get Feed failure': props<{ errors: BackendErrorsInterface }>(),
  },
});
