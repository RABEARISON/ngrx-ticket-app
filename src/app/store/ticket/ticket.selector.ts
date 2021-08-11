import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TicketState} from './ticket.state';
import * as fromTicket from './ticket.reducer';

export const getRouteState = createFeatureSelector<TicketState>('Ticket');

export const selectTicketState = createSelector(
  getRouteState,
  (state): TicketState => state
);

export const selectTicketLoading = createSelector(
  selectTicketState,
  ({loading}) => loading
);

export const selectAllTicket = createSelector(
  selectTicketState,
  fromTicket.selectAll
);

export const selectTicket = (id) => createSelector(
    fromTicket.selectEntities,
    entities => entities[id]
);
