import {createAction, props} from '@ngrx/store';
import {Ticket} from "../../../interfaces/ticket.interface";

const source = 'ticket';

export const TicketLoadRequested = createAction(
  `[${source}] load requested`
);

export const TicketRequestedSuccess = createAction(
  `[${source}] loaded`,
  props<{ tickets: Ticket[] }>()
);

export const TicketRequestedFailure = createAction(
  `[${source}] load failed`,
  props<{ errorMessage: string }>()
);

export const TicketCreateRequested = createAction(
  `[${source}] create requested`,
  props<{ description: string }>()
);

export const TicketCreateSuccess = createAction(
  `[${source}] created`,
  props<{ ticket: Ticket }>()
);

export const TicketCreateFailure = createAction(
  `[${source}] create failed`,
  props<{ errorMessage: string }>()
);

export const TicketUpdateRequested = createAction(
  `[${source}] update requested`,
  props<{ ticket: Ticket }>()
);

export const TicketUpdateSuccess = createAction(
  `[${source}] updated`,
  props<{ ticket: Ticket }>()
);

export const TicketUpdateFailure = createAction(
  `[${source}] update failed`,
  props<{ errorMessage: string }>()
);