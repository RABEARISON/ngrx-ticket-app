import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TicketState} from './ticket.state';
import * as fromTicket from './ticket.reducer';

export const getRouteState = createFeatureSelector<TicketState>('ticket');

export const selectTicketState = createSelector(
  getRouteState,
  (state): TicketState => state
);

export const selectTicketLoading = createSelector(
  selectTicketState,
  ({loading}) => loading
);

export const selectTicketLoaded = createSelector(
    selectTicketState,
    ({loaded}) => loaded
);

export const selectAllTicket = createSelector(
  selectTicketState,
  fromTicket.selectAll
);

export const selectTicket = (id: number | string) => createSelector(
    selectTicketState,
    state => state.entities[id]
);
