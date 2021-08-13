import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Ticket} from "../../../interfaces/ticket.interface";

export interface TicketState extends EntityState<Ticket>{
  loading: boolean;
  loaded: boolean;
  updateRollback: Ticket[];
  errorMessage: any;
}

export const TicketAdapter: EntityAdapter<Ticket> = createEntityAdapter<Ticket>({
  selectId: (entry) => entry.id
});

export const TicketInitialState: TicketState = TicketAdapter.getInitialState({
  loaded: false,
  loading: false,
  updateRollback: [],
  errorMessage: undefined
});
