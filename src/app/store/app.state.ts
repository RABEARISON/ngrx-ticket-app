import {UserState} from "./user/user.state";
import {TicketState} from "./ticket/ticket.state";

export interface AppState {
    user: UserState,
    ticket: TicketState
}