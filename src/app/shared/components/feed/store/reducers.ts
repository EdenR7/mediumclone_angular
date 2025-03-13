import { createFeature, createReducer, on } from '@ngrx/store';
// import { AuthStateInterface } from '../types/authState.interface';
// import { authActions } from './actions';
import { routerNavigationAction } from '@ngrx/router-store';
import { FeedStateInterface } from '../types/feedState.inteface';
import { feedActions } from './actions';

const initialState: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const feedFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    // GET FEED
    on(feedActions.getFeed, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(feedActions.getFeedSuccess, (state, action) => {
      console.log(action.feed);
      return {
        ...state,
        isLoading: false,
        data: action.feed,
      };
    }),
    on(feedActions.getFeedFailure, (state, action) => ({
      ...state,
      isLoading: false,
      // error: action.errors,
    })),
    // On event of routing we will make sure we clean the errors as it unneccessery anymore
    on(routerNavigationAction, (state) => initialState)
  ),
});

export const {
  name: feedFeatureKey,
  reducer: feedReducer,
  selectData: selectFeedState,
  selectIsLoading,
  selectError,
} = feedFeature;
