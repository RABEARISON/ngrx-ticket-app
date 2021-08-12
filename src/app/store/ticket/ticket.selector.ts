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
  (state) => state?.loading
);

export const selectTicketLoaded = createSelector(
    selectTicketState,
    (state) => state?.loaded
);

export const selectAllTicket = createSelector(
  selectTicketState,
  fromTicket.selectAll
);

export const selectTodoTickets = createSelector(
    selectAllTicket,
    tickets => tickets.filter(ticket => !ticket.completed)
);

export const selectCompletedTickets = createSelector(
    selectAllTicket,
    tickets => tickets.filter(ticket => ticket.completed)
);

export const selectTicket = (id: number | string) => createSelector(
    selectTicketState,
    state => state?.entities[id]
);
