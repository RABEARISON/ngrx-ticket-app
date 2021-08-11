import {createReducer, on} from '@ngrx/store';
import * as UserActions from './user.action';
import {UserAdapter, UserInitialState} from "./user.state";

export const reducer = createReducer(
  UserInitialState,
  on(
    UserActions.UserLoadRequested,
    (state) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(
    UserActions.UserRequestedSuccess,
    (state, {users}) => {
      return UserAdapter.setAll(users || [], {
        ...state,
        loading: false,
        loaded: true
      });
    }),
  on(
    UserActions.UserRequestedFailure,
    (state, {errorMessage}) => {
      return {
        ...state,
        errorMessage,
        loading: false,
        loaded: false
      };
  })
);

export const {
  selectAll,
  selectIds,
  selectTotal,
} = UserAdapter.getSelectors();

