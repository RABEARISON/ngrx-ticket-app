import {createReducer, on} from '@ngrx/store';
import {TicketAdapter, TicketInitialState} from './ticket.state';
import * as TicketActions from './ticket.action';

export const reducer = createReducer(
  TicketInitialState,
  on(
    TicketActions.TicketLoadRequested,
    TicketActions.TicketCreateRequested,
    TicketActions.TicketUpdateRequested,
    (state) => {
      return {
        ...state,
        loading: true
      };
    }),
  on(
    TicketActions.TicketCreateSuccess,
    (state, {ticket}) => {
      return TicketAdapter.addOne(ticket, {
        ...state,
        loading: false
      });
    }),
  on(
    TicketActions.TicketRequestedSuccess,
    (state, {tickets}) => {
      return TicketAdapter.setAll(tickets || [], {
        ...state,
        loading: false,
        loaded: true
      });
    }),
  on(
    TicketActions.TicketUpdateSuccess,
    (state, {ticket}) => {
      return TicketAdapter.updateOne({id: ticket.id, changes: ticket}, {
        ...state,
        loading: false
      });
    }),
  on(
    TicketActions.TicketRequestedFailure,
    TicketActions.TicketCreateFailure,
    TicketActions.TicketUpdateFailure,
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
  selectTotal
} = TicketAdapter.getSelectors();

