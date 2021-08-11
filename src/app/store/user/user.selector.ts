import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from './user.state';
import * as fromTicket from './user.reducer';

export const getRouteState = createFeatureSelector<UserState>('Ticket');

export const selectTicketState = createSelector(
  getRouteState,
  (state): UserState => state
);

export const selectTicketLoading = createSelector(
  selectTicketState,
  ({loading}) => loading
);

export const selectAllTicket = createSelector(
  selectTicketState,
  fromTicket.selectAll
);
