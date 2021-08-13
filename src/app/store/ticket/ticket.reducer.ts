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
        const entity = state.entities[ticket.id];
        let updateRollback = [...state.updateRollback, entity];
        updateRollback = updateRollback.slice(-5);

      return TicketAdapter.updateOne({id: ticket.id, changes: ticket}, {
          ...state,
          updateRollback,
          loading: false
      });
    }),
  on(
      TicketActions.TicketUpdateRollback,
      (state) => {
          const lastState = state.updateRollback[state.updateRollback.length - 1];
          const cloneRollbackHistories = [...state.updateRollback];

          if (cloneRollbackHistories.length > -1) {
              cloneRollbackHistories.pop();
          }
          return TicketAdapter.updateOne({id: lastState.id, changes: lastState}, {
              ...state,
              updateRollback: cloneRollbackHistories,
              loading: false
          } )
      }
  ),
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

