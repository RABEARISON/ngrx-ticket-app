import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from './user.state';
import * as fromUser from './user.reducer';

export const getRouteState = createFeatureSelector<UserState>('user');

export const selectUserState = createSelector(
  getRouteState,
  (state): UserState => state
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state?.loading
);

export const selectUserLoaded = createSelector(
    selectUserState,
    (state) => state?.loaded
);

export const selectAllUser = createSelector(
  selectUserState,
  fromUser.selectAll
);
