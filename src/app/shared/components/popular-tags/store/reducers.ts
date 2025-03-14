import { createFeature, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';
import { TagsStateInterface } from '../tags.interface';
import { tagsActions } from './actions';

const initialState: TagsStateInterface = {
  isLoading: false,
  error: null,
  data: [],
};

const tagsFeature = createFeature({
  name: 'tags',
  reducer: createReducer(
    initialState,
    // GET FEED
    on(tagsActions.getTags, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(tagsActions.getTagsSuccess, (state, action) => {
      console.log(action.tags);
      return {
        ...state,
        isLoading: false,
        data: action.tags,
      };
    }),
    on(tagsActions.getTagsFailure, (state, action) => ({
      ...state,
      isLoading: false,
      // error: action.errors,
    })),
    // On event of routing we will make sure we clean the errors as it unneccessery anymore
    on(routerNavigationAction, () => initialState)
  ),
});

export const {
  name: tagsFeatureKey,
  reducer: tagsReducer,
  selectData,
  selectError,
  selectIsLoading,
} = tagsFeature;
